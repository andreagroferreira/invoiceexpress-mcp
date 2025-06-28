import type { McpTool } from '../types.js';
import type { CreateTreasuryMovementRequest } from '../../api/types/treasury.js';
import { z } from 'zod';

const paramsSchema = z.object({
  clientId: z.number().describe('The client ID'),
  value: z.number().describe('Movement value'),
  movement_type: z.enum(['Payment', 'Reimbursement']).describe('Type of movement'),
  date: z.string().describe('Date of movement (YYYY-MM-DD)'),
  payment_method: z.string().optional().describe('Payment method (e.g., MB, CC, TB)'),
  serie: z.string().optional().describe('Document series'),
  observation: z.string().optional().describe('Optional observation/note'),
});

export const createTreasuryMovementTool: McpTool = {
  name: 'treasury_create_movement',
  description: 'Create a treasury movement (payment or reimbursement) for a client',
  inputSchema: {
    type: 'object',
    required: ['clientId', 'value', 'movement_type', 'date'],
    properties: {
      clientId: { type: 'number', description: 'The client ID' },
      value: { type: 'number', description: 'Movement value' },
      movement_type: { 
        type: 'string',
        enum: ['Payment', 'Reimbursement'],
        description: 'Type of movement' 
      },
      date: { type: 'string', description: 'Date of movement (YYYY-MM-DD)' },
      payment_method: { type: 'string', description: 'Payment method (e.g., MB, CC, TB)' },
      serie: { type: 'string', description: 'Document series' },
      observation: { type: 'string', description: 'Optional observation/note' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const movementData: CreateTreasuryMovementRequest = {
      value: params.value,
      movement_type: params.movement_type,
      date: params.date,
      payment_method: params.payment_method,
      serie: params.serie,
      observation: params.observation,
    };

    try {
      await server.treasuryEndpoint.createTreasuryMovement(
        params.clientId,
        movementData
      );
      
      return {
        success: true,
        message: `Treasury ${params.movement_type.toLowerCase()} of ${params.value} created successfully for client ID ${params.clientId}`,
        details: {
          value: params.value,
          movement_type: params.movement_type,
          date: params.date,
          payment_method: params.payment_method,
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
          error: `Invalid movement data: ${error.message}`,
        };
      }
      throw error;
    }
  },
};