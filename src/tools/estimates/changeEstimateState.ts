import type { McpTool } from '../types.js';
import type { ChangeEstimateStateRequest } from '../../api/types/estimate.js';
import { z } from 'zod';
import { ESTIMATE_STATE_TRANSITIONS } from '../../api/types/estimate.js';

const paramsSchema = z.object({
  id: z.number().describe('The estimate ID'),
  type: z.enum(['quote', 'proforma', 'fees_note']).default('quote')
    .describe('The type of estimate'),
  state: z.enum(['finalized', 'deleted', 'accept', 'refuse', 'canceled'])
    .describe('The new state for the estimate'),
  message: z.string().optional()
    .describe('Message for state change (required for cancellations)'),
});

export const changeEstimateStateTool: McpTool = {
  name: 'estimate_change_state',
  description: 'Change the state of an estimate (finalize, accept, refuse, cancel, delete)',
  inputSchema: {
    type: 'object',
    required: ['id', 'state'],
    properties: {
      id: { type: 'number', description: 'The estimate ID' },
      type: { 
        type: 'string', 
        enum: ['quote', 'proforma', 'fees_note'],
        default: 'quote',
        description: 'The type of estimate'
      },
      state: { 
        type: 'string', 
        enum: ['finalized', 'deleted', 'accept', 'refuse', 'canceled'],
        description: 'The new state for the estimate'
      },
      message: { 
        type: 'string', 
        description: 'Message for state change (required for cancellations)' 
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    // Validate if message is required
    const transition = ESTIMATE_STATE_TRANSITIONS[params.state];
    if (transition?.requiresMessage && !params.message) {
      throw new Error(`Message is required when changing state to '${params.state}'`);
    }

    const stateData: ChangeEstimateStateRequest = {
      [params.type]: {
        state: params.state,
        message: params.message,
      },
    };

    await server.estimatesEndpoint.changeState(params.id, stateData);
    
    const actionMap: Record<string, string> = {
      finalized: 'finalized',
      deleted: 'deleted',
      accept: 'accepted',
      refuse: 'refused',
      canceled: 'canceled',
    };
    
    return {
      success: true,
      message: `Estimate ${params.id} successfully ${actionMap[params.state]}${params.message ? ` with message: "${params.message}"` : ''}`,
    };
  },
};