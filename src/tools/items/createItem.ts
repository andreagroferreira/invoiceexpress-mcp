import type { McpTool } from '../types.js';
import type { CreateItemRequest } from '../../api/types/item.js';
import { z } from 'zod';

const taxSchema = z.object({
  name: z.string().describe('Tax name'),
}).optional();

const paramsSchema = z.object({
  name: z.string().describe('Unique item name'),
  description: z.string().describe('Item description'),
  unit_price: z.number().min(0).describe('Unit price (must be >= 0)'),
  unit: z.string().optional().describe('Unit of measurement'),
  tax: taxSchema.describe('Tax information'),
});

export const createItemTool: McpTool = {
  name: 'item_create',
  description: 'Create a new item/product',
  inputSchema: {
    type: 'object',
    required: ['name', 'description', 'unit_price'],
    properties: {
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
    
    const itemData: CreateItemRequest = {
      name: params.name,
      description: params.description,
      unit_price: params.unit_price,
      unit: params.unit,
      tax: params.tax,
    };

    const result = await server.itemsEndpoint.create(itemData);
    
    return {
      success: true,
      item: result,
      message: `Item "${result.name}" created successfully`,
    };
  },
};