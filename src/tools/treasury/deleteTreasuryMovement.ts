import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  clientId: z.number().describe('The client ID'),
  movementId: z.number().describe('The treasury movement ID to delete'),
});

export const deleteTreasuryMovementTool: McpTool = {
  name: 'treasury_delete_movement',
  description: 'Delete a treasury movement for a client',
  inputSchema: {
    type: 'object',
    required: ['clientId', 'movementId'],
    properties: {
      clientId: { type: 'number', description: 'The client ID' },
      movementId: { type: 'number', description: 'The treasury movement ID to delete' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      await server.treasuryEndpoint.deleteTreasuryMovement(
        params.clientId,
        params.movementId
      );
      
      return {
        success: true,
        message: `Treasury movement ID ${params.movementId} deleted successfully for client ID ${params.clientId}`,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Client or treasury movement not found`,
        };
      }
      throw error;
    }
  },
};