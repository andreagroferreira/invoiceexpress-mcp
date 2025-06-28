import type { McpTool } from '../types.js';
import type { UpdateEstimateRequest } from '../../api/types/estimate.js';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().describe('Client name'),
  code: z.string().describe('Client code'),
  email: z.string().optional().describe('Client email'),
  address: z.string().optional().describe('Client address'),
  city: z.string().optional().describe('Client city'),
  postal_code: z.string().optional().describe('Client postal code'),
  country: z.string().optional().describe('Client country'),
  fiscal_id: z.string().optional().describe('Client fiscal ID'),
  website: z.string().optional().describe('Client website'),
  phone: z.string().optional().describe('Client phone'),
  fax: z.string().optional().describe('Client fax'),
  observations: z.string().optional().describe('Client observations'),
}).partial();

const itemSchema = z.object({
  name: z.string().describe('Item name'),
  description: z.string().optional().describe('Item description'),
  unit_price: z.number().describe('Unit price'),
  quantity: z.number().describe('Quantity'),
  unit: z.string().optional().describe('Unit of measurement'),
  discount: z.number().optional().describe('Discount percentage'),
  tax: z.object({
    name: z.string().describe('Tax name'),
    value: z.number().describe('Tax value'),
  }).optional().describe('Tax information'),
});

const paramsSchema = z.object({
  id: z.number().describe('The estimate ID to update'),
  type: z.enum(['quote', 'proforma', 'fees_note']).default('quote')
    .describe('The type of estimate'),
  date: z.string().optional().describe('Estimate date (YYYY-MM-DD)'),
  due_date: z.string().optional().describe('Due date (YYYY-MM-DD)'),
  client: clientSchema.optional().describe('Client information'),
  items: z.array(itemSchema).optional().describe('List of items'),
  reference: z.string().optional().describe('Reference number'),
  observations: z.string().optional().describe('Observations'),
  retention: z.string().optional().describe('Retention value'),
  tax_exemption: z.string().optional().describe('Tax exemption reason'),
  sequence_id: z.string().optional().describe('Sequence ID'),
  manual_sequence_number: z.string().optional().describe('Manual sequence number'),
});

export const updateEstimateTool: McpTool = {
  name: 'estimate_update',
  description: 'Update an existing estimate',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The estimate ID to update' },
      type: { 
        type: 'string', 
        enum: ['quote', 'proforma', 'fees_note'],
        default: 'quote',
        description: 'The type of estimate'
      },
      date: { type: 'string', description: 'Estimate date (YYYY-MM-DD)' },
      due_date: { type: 'string', description: 'Due date (YYYY-MM-DD)' },
      client: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Client name' },
          code: { type: 'string', description: 'Client code' },
          email: { type: 'string', description: 'Client email' },
          address: { type: 'string', description: 'Client address' },
          city: { type: 'string', description: 'Client city' },
          postal_code: { type: 'string', description: 'Client postal code' },
          country: { type: 'string', description: 'Client country' },
          fiscal_id: { type: 'string', description: 'Client fiscal ID' },
          website: { type: 'string', description: 'Client website' },
          phone: { type: 'string', description: 'Client phone' },
          fax: { type: 'string', description: 'Client fax' },
          observations: { type: 'string', description: 'Client observations' },
        },
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'unit_price', 'quantity'],
          properties: {
            name: { type: 'string', description: 'Item name' },
            description: { type: 'string', description: 'Item description' },
            unit_price: { type: 'number', description: 'Unit price' },
            quantity: { type: 'number', description: 'Quantity' },
            unit: { type: 'string', description: 'Unit of measurement' },
            discount: { type: 'number', description: 'Discount percentage' },
            tax: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'Tax name' },
                value: { type: 'number', description: 'Tax value' },
              },
            },
          },
        },
      },
      reference: { type: 'string', description: 'Reference number' },
      observations: { type: 'string', description: 'Observations' },
      retention: { type: 'string', description: 'Retention value' },
      tax_exemption: { type: 'string', description: 'Tax exemption reason' },
      sequence_id: { type: 'string', description: 'Sequence ID' },
      manual_sequence_number: { type: 'string', description: 'Manual sequence number' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    const { id, type, ...updateData } = params;
    
    const estimateData: UpdateEstimateRequest = {
      [type]: updateData as any,
    };

    const result = await server.estimatesEndpoint.update(id, estimateData);
    
    return result;
  },
};