import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const changeInvoiceStateSchema = z.object({
  id: z.number().positive(),
  state: z.enum(['finalized', 'canceled', 'deleted']),
  message: z.string().optional(),
  document_type: z.enum(['invoices', 'invoice_receipts', 'simplified_invoices', 'credit_notes', 'debit_notes']).default('invoices'),
});

export const changeInvoiceStateTool: McpTool = {
  name: 'invoice_change_state',
  description: 'Change the state of an invoice (finalize, cancel, or delete)',
  inputSchema: {
    type: 'object',
    required: ['id', 'state'],
    properties: {
      id: {
        type: 'number',
        description: 'Invoice ID',
      },
      state: {
        type: 'string',
        description: 'New state for the invoice',
        enum: ['finalized', 'canceled', 'deleted'],
      },
      message: {
        type: 'string',
        description: 'Message explaining the cancellation (required when state is "canceled")',
      },
      document_type: {
        type: 'string',
        description: 'Document type (default: invoices)',
        enum: ['invoices', 'invoice_receipts', 'simplified_invoices', 'credit_notes', 'debit_notes'],
      },
    },
  },
  handler: async (args, server) => {
    const { id, state, message, document_type } = validateInput(changeInvoiceStateSchema, args, 'change invoice state');
    
    if (state === 'canceled' && !message) {
      throw new Error('Message is required when canceling an invoice');
    }
    
    const invoice = await server.invoicesEndpoint.changeState(id, state, document_type, message);
    
    const actionMessages = {
      finalized: 'finalized and can no longer be edited',
      canceled: 'canceled',
      deleted: 'deleted',
    };
    
    return {
      success: true,
      invoice: {
        id: invoice.id,
        reference: invoice.reference,
        status: invoice.status,
        date: invoice.date,
        client_name: invoice.client.name,
        total: invoice.total,
        currency: invoice.currency,
      },
      message: `Invoice ${invoice.reference} has been ${actionMessages[state]}`,
      new_state: state,
    };
  },
};