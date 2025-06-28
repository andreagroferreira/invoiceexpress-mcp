import type { McpTool } from '../types.js';
import type { CreateSequenceRequest } from '../../api/types/sequence.js';
import { z } from 'zod';

const paramsSchema = z.object({
  serie: z.string().describe('Series name for the sequence (e.g., "2024")'),
  default_sequence: z.enum(['0', '1']).optional()
    .describe('Set as default sequence (1) or not (0)'),
});

export const createSequenceTool: McpTool = {
  name: 'sequence_create',
  description: 'Create a new document sequence',
  inputSchema: {
    type: 'object',
    required: ['serie'],
    properties: {
      serie: { type: 'string', description: 'Series name for the sequence (e.g., "2024")' },
      default_sequence: { 
        type: 'string', 
        enum: ['0', '1'],
        description: 'Set as default sequence (1) or not (0)' 
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const sequenceData: CreateSequenceRequest = {
      serie: params.serie,
      default_sequence: params.default_sequence,
    };

    const result = await server.sequencesEndpoint.create(sequenceData);
    
    return {
      success: true,
      sequence: result,
      message: `Sequence "${result.serie}" created successfully${result.default_sequence === 1 ? ' and set as default' : ''}`,
    };
  },
};