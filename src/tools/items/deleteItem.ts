import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The item ID to delete'),
});

export const deleteItemTool: McpTool = {
  name: 'item_delete',
  description: 'Delete an item/product',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The item ID to delete' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      await server.itemsEndpoint.delete(params.id);
      
      return {
        success: true,
        message: `Item ID ${params.id} deleted successfully`,
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