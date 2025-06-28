import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput, dateSchema } from '../../utils/validation.js';

const createInvoiceSchema = z.object({
  date: dateSchema,
  due_date: dateSchema,
  client: z.object({
    id: z.number().positive().optional(),
    name: z.string().optional(),
    code: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
    fiscal_id: z.string().optional(),
  }).refine(
    (data) => data.id || data.name,
    'Either client ID or client name must be provided',
  ),
  items: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      unit_price: z.number().positive(),
      quantity: z.number().positive(),
      unit: z.string().optional(),
      discount: z.number().min(0).max(100).optional(),
      tax: z.object({
        id: z.number().positive(),
      }).optional(),
    }),
  ).min(1, 'At least one item is required'),
  reference: z.string().optional(),
  observations: z.string().optional(),
  retention: z.number().min(0).optional(),
  tax_exemption: z.string().optional(),
  manual_sequence_number: z.string().optional(),
});

export const createInvoiceTool: McpTool = {
  name: 'invoice_create',
  description: 'Create a new invoice',
  inputSchema: {
    type: 'object',
    required: ['date', 'due_date', 'client', 'items'],
    properties: {
      date: {
        type: 'string',
        description: 'Invoice date (YYYY-MM-DD)',
      },
      due_date: {
        type: 'string',
        description: 'Due date (YYYY-MM-DD)',
      },
      client: {
        type: 'object',
        description: 'Client information (provide either id or name)',
        properties: {
          id: { type: 'number', description: 'Existing client ID' },
          name: { type: 'string', description: 'Client name' },
          code: { type: 'string', description: 'Client code' },
          email: { type: 'string', description: 'Client email' },
          address: { type: 'string', description: 'Client address' },
          city: { type: 'string', description: 'Client city' },
          postal_code: { type: 'string', description: 'Client postal code' },
          country: { type: 'string', description: 'Client country' },
          fiscal_id: { type: 'string', description: 'Client fiscal ID (NIF)' },
        },
      },
      items: {
        type: 'array',
        description: 'Invoice items',
        items: {
          type: 'object',
          required: ['name', 'unit_price', 'quantity'],
          properties: {
            name: { type: 'string', description: 'Item name' },
            description: { type: 'string', description: 'Item description' },
            unit_price: { type: 'number', description: 'Unit price' },
            quantity: { type: 'number', description: 'Quantity' },
            unit: { type: 'string', description: 'Unit of measure' },
            discount: { type: 'number', description: 'Discount percentage (0-100)' },
            tax: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'Tax ID (e.g., 1 for VAT 23%)' },
              },
            },
          },
        },
      },
      reference: { type: 'string', description: 'Reference number' },
      observations: { type: 'string', description: 'Observations/notes' },
      retention: { type: 'number', description: 'Retention percentage' },
      tax_exemption: { type: 'string', description: 'Tax exemption reason' },
      manual_sequence_number: { type: 'string', description: 'Manual sequence number' },
    },
  },
  handler: async (args, server) => {
    const invoiceData = validateInput(createInvoiceSchema, args, 'create invoice');
    const invoice = await server.invoicesEndpoint.create(invoiceData);
    
    return {
      success: true,
      invoice: {
        id: invoice.id,
        reference: invoice.reference,
        status: invoice.status,
        date: invoice.date,
        due_date: invoice.due_date,
        client_name: invoice.client.name,
        total: invoice.total,
        currency: invoice.currency,
      },
      message: `Invoice ${invoice.reference} created successfully`,
    };
  },
};