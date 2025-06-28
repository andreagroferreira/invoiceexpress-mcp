import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  code: z.string().describe('The client code to search for'),
});

export const findClientByCodeTool: McpTool = {
  name: 'client_find_by_code',
  description: 'Find a client by code',
  inputSchema: {
    type: 'object',
    required: ['code'],
    properties: {
      code: { type: 'string', description: 'The client code to search for' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      const client = await server.clientsEndpoint.getByCode(params.code);
      
      return {
        success: true,
        client,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Client with code "${params.code}" not found`,
        };
      }
      throw error;
    }
  },
};