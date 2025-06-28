import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The tax ID to delete'),
});

export const deleteTaxTool: McpTool = {
  name: 'tax_delete',
  description: 'Delete a tax',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The tax ID to delete' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      await server.taxesEndpoint.delete(params.id);
      
      return {
        success: true,
        message: `Tax ID ${params.id} deleted successfully`,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Tax with ID ${params.id} not found`,
        };
      }
      throw error;
    }
  },
};