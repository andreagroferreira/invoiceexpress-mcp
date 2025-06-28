import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  clientId: z.number().describe('The client ID'),
});

export const getRegularizationsTool: McpTool = {
  name: 'treasury_get_regularizations',
  description: 'List all regularizations for a specific client',
  inputSchema: {
    type: 'object',
    required: ['clientId'],
    properties: {
      clientId: { type: 'number', description: 'The client ID' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      const response = await server.treasuryEndpoint.getRegularizations(params.clientId);
      
      return {
        success: true,
        regularizations: response.regularization,
        pagination: response.pagination,
        message: `Found ${response.regularization.length} regularizations for client ID ${params.clientId}`,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Client with ID ${params.clientId} not found`,
        };
      }
      throw error;
    }
  },
};