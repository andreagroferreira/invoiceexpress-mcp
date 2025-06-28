import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const cancelPaymentSchema = z.object({
  receipt_id: z.number().positive(),
  message: z.string().min(1),
});

export const cancelPaymentTool: McpTool = {
  name: 'invoice_cancel_payment',
  description: 'Cancel a payment receipt',
  inputSchema: {
    type: 'object',
    required: ['receipt_id', 'message'],
    properties: {
      receipt_id: {
        type: 'number',
        description: 'Receipt ID to cancel',
      },
      message: {
        type: 'string',
        description: 'Reason for canceling the payment',
      },
    },
  },
  handler: async (args, server) => {
    const { receipt_id, message } = validateInput(cancelPaymentSchema, args, 'cancel payment');
    
    const response = await server.invoicesEndpoint.cancelPayment(receipt_id, message);
    
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
      message: `Payment receipt ${response.receipt.sequence_number} has been canceled`,
      cancellation_reason: message,
    };
  },
};