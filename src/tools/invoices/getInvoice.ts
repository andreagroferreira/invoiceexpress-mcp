import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const getInvoiceSchema = z.object({
  id: z.number().positive(),
});

export const getInvoiceTool: McpTool = {
  name: 'invoice_get',
  description: 'Get details of a specific invoice',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'Invoice ID',
      },
    },
  },
  handler: async (args, server) => {
    const { id } = validateInput(getInvoiceSchema, args, 'get invoice');
    const invoice = await server.invoicesEndpoint.get(id);
    
    return {
      invoice: {
        id: invoice.id,
        reference: invoice.reference,
        status: invoice.status,
        date: invoice.date,
        due_date: invoice.due_date,
        client: {
          id: invoice.client.id,
          name: invoice.client.name,
          email: invoice.client.email,
          fiscal_id: invoice.client.fiscal_id,
        },
        items: invoice.items.map((item) => ({
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          discount: item.discount,
          tax: item.tax,
          total: item.total,
        })),
        totals: {
          sum: invoice.sum,
          discount: invoice.discount,
          before_taxes: invoice.before_taxes,
          taxes: invoice.taxes,
          total: invoice.total,
        },
        observations: invoice.observations,
        retention: invoice.retention,
        tax_exemption: invoice.tax_exemption,
        created_at: invoice.created_at,
        updated_at: invoice.updated_at,
      },
    };
  },
};