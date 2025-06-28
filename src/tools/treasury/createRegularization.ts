import type { McpTool } from '../types.js';
import type { CreateRegularizationRequest } from '../../api/types/treasury.js';
import { z } from 'zod';

const paramsSchema = z.object({
  clientId: z.number().describe('The client ID'),
  value: z.number().describe('Regularization value'),
  date: z.string().describe('Date of regularization (YYYY-MM-DD)'),
  observation: z.string().optional().describe('Optional observation/note'),
});

export const createRegularizationTool: McpTool = {
  name: 'treasury_create_regularization',
  description: 'Create a new regularization for a client',
  inputSchema: {
    type: 'object',
    required: ['clientId', 'value', 'date'],
    properties: {
      clientId: { type: 'number', description: 'The client ID' },
      value: { type: 'number', description: 'Regularization value' },
      date: { type: 'string', description: 'Date of regularization (YYYY-MM-DD)' },
      observation: { type: 'string', description: 'Optional observation/note' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const regularizationData: CreateRegularizationRequest = {
      value: params.value,
      date: params.date,
      observation: params.observation,
    };

    try {
      const response = await server.treasuryEndpoint.createRegularization(
        params.clientId,
        regularizationData
      );
      
      const created = response.regularization[0];
      
      return {
        success: true,
        regularization: created,
        message: `Regularization ${created?.number || 'new'} created successfully for client ID ${params.clientId}`,
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
          error: `Invalid regularization data: ${error.message}`,
        };
      }
      throw error;
    }
  },
};