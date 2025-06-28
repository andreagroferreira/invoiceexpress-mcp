import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  name: z.string().describe('The exact client name to search for'),
});

export const findClientByNameTool: McpTool = {
  name: 'client_find_by_name',
  description: 'Find a client by exact name match',
  inputSchema: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', description: 'The exact client name to search for' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      const client = await server.clientsEndpoint.findByName(params.name);
      
      return {
        success: true,
        client,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Client with name "${params.name}" not found`,
        };
      }
      throw error;
    }
  },
};