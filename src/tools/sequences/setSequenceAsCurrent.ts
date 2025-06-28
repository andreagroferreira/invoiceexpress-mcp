import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The sequence ID to set as current/default'),
});

export const setSequenceAsCurrentTool: McpTool = {
  name: 'sequence_set_as_current',
  description: 'Set a sequence as the current/default sequence',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The sequence ID to set as current/default' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      await server.sequencesEndpoint.setAsCurrent(params.id);
      
      return {
        success: true,
        message: `Sequence ID ${params.id} set as current/default sequence`,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Sequence with ID ${params.id} not found`,
        };
      }
      throw error;
    }
  },
};