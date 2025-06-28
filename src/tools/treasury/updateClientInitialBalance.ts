import type { McpTool } from '../types.js';
import type { UpdateInitialBalanceRequest } from '../../api/types/treasury.js';
import { z } from 'zod';

const paramsSchema = z.object({
  clientId: z.number().describe('The client ID'),
  value: z.number().describe('Initial balance value'),
  date: z.string().describe('Date of initial balance (YYYY-MM-DD)'),
  observation: z.string().optional().describe('Optional observation/note'),
});

export const updateClientInitialBalanceTool: McpTool = {
  name: 'treasury_update_client_initial_balance',
  description: 'Set or update the initial balance for a client',
  inputSchema: {
    type: 'object',
    required: ['clientId', 'value', 'date'],
    properties: {
      clientId: { type: 'number', description: 'The client ID' },
      value: { type: 'number', description: 'Initial balance value' },
      date: { type: 'string', description: 'Date of initial balance (YYYY-MM-DD)' },
      observation: { type: 'string', description: 'Optional observation/note' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const balanceData: UpdateInitialBalanceRequest = {
      value: params.value,
      date: params.date,
      observation: params.observation,
    };

    try {
      await server.treasuryEndpoint.updateClientInitialBalance(
        params.clientId,
        balanceData
      );
      
      return {
        success: true,
        message: `Initial balance updated successfully for client ID ${params.clientId}`,
        details: {
          value: params.value,
          date: params.date,
          observation: params.observation,
        },
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Client with ID ${params.clientId} not found`,
        };
      }
      if (error.status === 422) {
        return {
          success: false,
          error: `Invalid data: ${error.message}. Note: The date must be prior to the first document issuance.`,
        };
      }
      throw error;
    }
  },
};