import type { McpTool } from '../types.js';
import type { UpdateItemRequest } from '../../api/types/item.js';
import { z } from 'zod';

const taxSchema = z.object({
  name: z.string().describe('Tax name'),
}).optional();

const paramsSchema = z.object({
  id: z.number().describe('The item ID to update'),
  name: z.string().optional().describe('Unique item name'),
  description: z.string().optional().describe('Item description'),
  unit_price: z.number().min(0).optional().describe('Unit price (must be >= 0)'),
  unit: z.string().optional().describe('Unit of measurement'),
  tax: taxSchema.describe('Tax information'),
});

export const updateItemTool: McpTool = {
  name: 'item_update',
  description: 'Update an existing item/product',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The item ID to update' },
      name: { type: 'string', description: 'Unique item name' },
      description: { type: 'string', description: 'Item description' },
      unit_price: { type: 'number', minimum: 0, description: 'Unit price (must be >= 0)' },
      unit: { type: 'string', description: 'Unit of measurement' },
      tax: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Tax name' },
        },
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    const { id, ...updateData } = params;
    
    const itemData: UpdateItemRequest = updateData;
    const result = await server.itemsEndpoint.update(id, itemData);
    
    return {
      success: true,
      item: result,
      message: `Item "${result.name}" (ID: ${result.id}) updated successfully`,
    };
  },
};