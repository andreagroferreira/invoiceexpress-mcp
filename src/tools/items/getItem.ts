import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The item ID'),
});

export const getItemTool: McpTool = {
  name: 'item_get',
  description: 'Get detailed information about a specific item',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The item ID' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      const item = await server.itemsEndpoint.get(params.id);
      
      return {
        success: true,
        item,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Item with ID ${params.id} not found`,
        };
      }
      throw error;
    }
  },
};