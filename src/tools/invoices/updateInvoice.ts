import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput, dateSchema } from '../../utils/validation.js';

const updateInvoiceSchema = z.object({
  id: z.number().positive(),
  document_type: z.enum(['invoices', 'invoice_receipts', 'simplified_invoices', 'credit_notes', 'debit_notes']).default('invoices'),
  date: dateSchema.optional(),
  due_date: dateSchema.optional(),
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
  }).optional(),
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
  ).optional(),
  reference: z.string().optional(),
  observations: z.string().optional(),
  retention: z.number().min(0).optional(),
  tax_exemption: z.string().optional(),
  sequence_id: z.number().positive().optional(),
  currency_code: z.string().optional(),
  global_discount: z.number().min(0).max(100).optional(),
});

export const updateInvoiceTool: McpTool = {
  name: 'invoice_update',
  description: 'Update an existing invoice',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'Invoice ID',
      },
      document_type: {
        type: 'string',
        description: 'Document type (default: invoices)',
        enum: ['invoices', 'invoice_receipts', 'simplified_invoices', 'credit_notes', 'debit_notes'],
      },
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
        description: 'Client information',
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
        description: 'Invoice items (will replace all existing items)',
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
                id: { type: 'number', description: 'Tax ID' },
              },
            },
          },
        },
      },
      reference: { type: 'string', description: 'Reference number' },
      observations: { type: 'string', description: 'Observations/notes' },
      retention: { type: 'number', description: 'Retention percentage' },
      tax_exemption: { type: 'string', description: 'Tax exemption reason' },
      sequence_id: { type: 'number', description: 'Sequence ID' },
      currency_code: { type: 'string', description: 'Currency code' },
      global_discount: { type: 'number', description: 'Global discount percentage (0-100)' },
    },
  },
  handler: async (args, server) => {
    const { id, document_type, ...updateData } = validateInput(updateInvoiceSchema, args, 'update invoice');
    
    await server.invoicesEndpoint.update(id, updateData, document_type);
    
    const updatedInvoice = await server.invoicesEndpoint.get(id, document_type);
    
    return {
      success: true,
      invoice: {
        id: updatedInvoice.id,
        reference: updatedInvoice.reference,
        status: updatedInvoice.status,
        date: updatedInvoice.date,
        due_date: updatedInvoice.due_date,
        client_name: updatedInvoice.client.name,
        total: updatedInvoice.total,
        currency: updatedInvoice.currency,
      },
      message: `Invoice ${updatedInvoice.reference} updated successfully`,
    };
  },
};