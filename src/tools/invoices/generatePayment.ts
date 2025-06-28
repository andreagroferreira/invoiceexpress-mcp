import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const generatePaymentSchema = z.object({
  id: z.number().positive(),
  payment_amount: z.number().positive(),
  payment_date: z.string(),
  payment_method: z.enum(['MB', 'TB', 'CC', 'CD', 'CH', 'CO', 'CS', 'DE', 'LC', 'NU', 'OU', 'PR', 'TR']).optional(),
  payment_mechanism: z.enum([
    'Dinheiro',
    'Cheque',
    'Débito Direto',
    'Transferência Bancária',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Compensação de saldos em conta corrente',
    'Vale Postal',
    'Outros meios aqui não assinalados'
  ]).optional(),
  observations: z.string().optional(),
  series_id: z.number().optional(),
});

export const generatePaymentTool: McpTool = {
  name: 'invoice_generate_payment',
  description: 'Generate a payment receipt for an invoice',
  inputSchema: {
    type: 'object',
    required: ['id', 'payment_amount', 'payment_date'],
    properties: {
      id: {
        type: 'number',
        description: 'Invoice ID',
      },
      payment_amount: {
        type: 'number',
        description: 'Payment amount',
      },
      payment_date: {
        type: 'string',
        description: 'Payment date (YYYY-MM-DD format)',
      },
      payment_method: {
        type: 'string',
        description: 'Payment method code',
        enum: ['MB', 'TB', 'CC', 'CD', 'CH', 'CO', 'CS', 'DE', 'LC', 'NU', 'OU', 'PR', 'TR'],
      },
      payment_mechanism: {
        type: 'string',
        description: 'Payment mechanism description',
        enum: [
          'Dinheiro',
          'Cheque',
          'Débito Direto',
          'Transferência Bancária',
          'Cartão de Crédito',
          'Cartão de Débito',
          'Compensação de saldos em conta corrente',
          'Vale Postal',
          'Outros meios aqui não assinalados'
        ],
      },
      observations: {
        type: 'string',
        description: 'Payment observations',
      },
      series_id: {
        type: 'number',
        description: 'Series ID for the receipt',
      },
    },
  },
  handler: async (args, server) => {
    const input = validateInput(generatePaymentSchema, args, 'generate payment');
    
    const paymentData = {
      receipt: {
        payment_amount: input.payment_amount,
        payment_date: input.payment_date,
        ...(input.payment_method && { payment_method: input.payment_method }),
        ...(input.payment_mechanism && { payment_mechanism: input.payment_mechanism }),
        ...(input.observations && { observations: input.observations }),
        ...(input.series_id && { series: { id: input.series_id } }),
      },
    };
    
    const response = await server.invoicesEndpoint.generatePayment(input.id, paymentData);
    
    return {
      success: true,
      receipt: {
        id: response.receipt.id,
        status: response.receipt.status,
        date: response.receipt.date,
        sequence_number: response.receipt.sequence_number,
        inverted_sequence_number: response.receipt.inverted_sequence_number,
        atcud: response.receipt.atcud,
        total: response.receipt.total,
        currency: response.receipt.currency,
        related_documents_count: response.receipt.related_documents_count,
      },
      message: `Payment receipt ${response.receipt.sequence_number} generated successfully`,
    };
  },
};