import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput, dateSchema } from '../../utils/validation.js';

const listInvoicesSchema = z.object({
  type: z.array(z.enum(['Invoice', 'SimplifiedInvoice', 'InvoiceReceipt', 'CreditNote', 'DebitNote'])).optional(),
  status: z.array(z.enum(['draft', 'sent', 'final', 'canceled', 'settled', 'unsettled'])).optional(),
  non_archived: z.boolean().optional(),
  text: z.string().optional(),
  reference: z.string().optional(),
  date_from: dateSchema.optional(),
  date_to: dateSchema.optional(),
  due_date_from: dateSchema.optional(),
  due_date_to: dateSchema.optional(),
  total_before_taxes_from: z.number().positive().optional(),
  total_before_taxes_to: z.number().positive().optional(),
  page: z.number().positive().default(1),
  per_page: z.number().min(1).max(100).default(20),
});

export const listInvoicesTool: McpTool = {
  name: 'invoice_list',
  description: 'List invoices with optional filters',
  inputSchema: {
    type: 'object',
    properties: {
      type: {
        type: 'array',
        description: 'Filter by document types',
        items: {
          type: 'string',
          enum: ['Invoice', 'SimplifiedInvoice', 'InvoiceReceipt', 'CreditNote', 'DebitNote'],
        },
      },
      status: {
        type: 'array',
        description: 'Filter by invoice status',
        items: {
          type: 'string',
          enum: ['draft', 'sent', 'final', 'canceled', 'settled', 'unsettled'],
        },
      },
      non_archived: {
        type: 'boolean',
        description: 'Filter non-archived documents',
      },
      text: {
        type: 'string',
        description: 'Search text in invoice/client/item details',
      },
      reference: {
        type: 'string',
        description: 'Filter by reference',
      },
      date_from: {
        type: 'string',
        description: 'Filter by start date (YYYY-MM-DD)',
      },
      date_to: {
        type: 'string',
        description: 'Filter by end date (YYYY-MM-DD)',
      },
      due_date_from: {
        type: 'string',
        description: 'Filter by due date from (YYYY-MM-DD)',
      },
      due_date_to: {
        type: 'string',
        description: 'Filter by due date to (YYYY-MM-DD)',
      },
      total_before_taxes_from: {
        type: 'number',
        description: 'Filter by minimum total amount before taxes',
      },
      total_before_taxes_to: {
        type: 'number',
        description: 'Filter by maximum total amount before taxes',
      },
      page: {
        type: 'number',
        description: 'Page number (default: 1)',
      },
      per_page: {
        type: 'number',
        description: 'Items per page (default: 20, max: 100)',
      },
    },
  },
  handler: async (args, server) => {
    const params = validateInput(listInvoicesSchema, args, 'list invoices');
    const result = await server.invoicesEndpoint.list(params);
    
    return {
      invoices: result.data,
      pagination: result.pagination,
      summary: {
        total_invoices: result.pagination.total_entries,
        showing: `${(result.pagination.current_page - 1) * result.pagination.per_page + 1}-${
          Math.min(
            result.pagination.current_page * result.pagination.per_page,
            result.pagination.total_entries,
          )
        }`,
      },
    };
  },
};