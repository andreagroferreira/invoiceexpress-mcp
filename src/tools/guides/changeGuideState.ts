import type { McpTool } from '../types.js';
import type { ChangeGuideStateRequest } from '../../api/types/guide.js';
import { z } from 'zod';
import { GUIDE_STATE_TRANSITIONS } from '../../api/types/guide.js';

const paramsSchema = z.object({
  id: z.number().describe('The guide ID'),
  type: z.enum(['shipping', 'transport', 'devolution']).default('shipping')
    .describe('The type of guide'),
  state: z.enum(['finalized', 'deleted', 'canceled'])
    .describe('The new state for the guide'),
  message: z.string().optional()
    .describe('Message for state change (required for cancellations)'),
});

export const changeGuideStateTool: McpTool = {
  name: 'guide_change_state',
  description: 'Change the state of a guide (finalize, cancel, delete)',
  inputSchema: {
    type: 'object',
    required: ['id', 'state'],
    properties: {
      id: { type: 'number', description: 'The guide ID' },
      type: { 
        type: 'string', 
        enum: ['shipping', 'transport', 'devolution'],
        default: 'shipping',
        description: 'The type of guide'
      },
      state: { 
        type: 'string', 
        enum: ['finalized', 'deleted', 'canceled'],
        description: 'The new state for the guide'
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
    const transition = GUIDE_STATE_TRANSITIONS[params.state];
    if (transition?.requiresMessage && !params.message) {
      throw new Error(`Message is required when changing state to '${params.state}'`);
    }

    const stateData: ChangeGuideStateRequest = {
      [params.type]: {
        state: params.state,
        message: params.message,
      },
    };

    await server.guidesEndpoint.changeState(params.id, stateData);
    
    const actionMap: Record<string, string> = {
      finalized: 'finalized',
      deleted: 'deleted',
      canceled: 'canceled',
    };
    
    return {
      success: true,
      message: `Guide ${params.id} successfully ${actionMap[params.state]}${params.message ? ` with message: "${params.message}"` : ''}`,
    };
  },
};