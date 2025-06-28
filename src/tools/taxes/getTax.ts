import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The tax ID'),
});

export const getTaxTool: McpTool = {
  name: 'tax_get',
  description: 'Get detailed information about a specific tax',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The tax ID' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      const tax = await server.taxesEndpoint.get(params.id);
      
      return {
        success: true,
        tax,
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