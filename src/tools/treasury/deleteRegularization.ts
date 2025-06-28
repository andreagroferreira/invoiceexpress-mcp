import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  clientId: z.number().describe('The client ID'),
  regularizationId: z.number().describe('The regularization ID to delete'),
});

export const deleteRegularizationTool: McpTool = {
  name: 'treasury_delete_regularization',
  description: 'Delete a regularization for a client',
  inputSchema: {
    type: 'object',
    required: ['clientId', 'regularizationId'],
    properties: {
      clientId: { type: 'number', description: 'The client ID' },
      regularizationId: { type: 'number', description: 'The regularization ID to delete' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      await server.treasuryEndpoint.deleteRegularization(
        params.clientId,
        params.regularizationId
      );
      
      return {
        success: true,
        message: `Regularization ID ${params.regularizationId} deleted successfully for client ID ${params.clientId}`,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Client or regularization not found`,
        };
      }
      throw error;
    }
  },
};