import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The account ID'),
});

export const getAccountTool: McpTool = {
  name: 'account_get',
  description: 'Get detailed information about a specific account',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The account ID' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      const account = await server.accountsEndpoint.get(params.id);
      
      return {
        success: true,
        account,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Account with ID ${params.id} not found`,
        };
      }
      throw error;
    }
  },
};