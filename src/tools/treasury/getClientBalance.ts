import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  clientId: z.number().describe('The client ID'),
});

export const getClientBalanceTool: McpTool = {
  name: 'treasury_get_client_balance',
  description: 'Get the financial balance information for a specific client',
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
      const balance = await server.treasuryEndpoint.getClientBalance(params.clientId);
      
      return {
        success: true,
        balance,
        summary: {
          currency: balance.currency.code,
          initial_balance: balance.initial_balance.value,
          current_balance_with_vat: balance.balance.with_vat,
          current_balance_without_vat: balance.balance.without_vat,
          overdue_with_vat: balance.overdue_balance.with_vat,
          overdue_without_vat: balance.overdue_balance.without_vat,
          remaining_total: balance.remaining_balance.total,
        },
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