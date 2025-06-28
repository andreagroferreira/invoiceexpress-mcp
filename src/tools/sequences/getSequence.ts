import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The sequence ID'),
});

export const getSequenceTool: McpTool = {
  name: 'sequence_get',
  description: 'Get detailed information about a specific sequence',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The sequence ID' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      const sequence = await server.sequencesEndpoint.get(params.id);
      
      return {
        success: true,
        sequence,
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