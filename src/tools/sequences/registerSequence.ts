import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The sequence ID to register with Tax Authority'),
});

export const registerSequenceTool: McpTool = {
  name: 'sequence_register',
  description: 'Register a sequence with the Tax Authority (AT)',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The sequence ID to register with Tax Authority' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    try {
      const result = await server.sequencesEndpoint.register(params.id);
      
      return {
        success: true,
        sequence: result,
        message: `Sequence ID ${params.id} registered with Tax Authority successfully`,
        validation_codes: {
          invoice: result.invoice_sequence_validation_code,
          credit_note: result.credit_note_sequence_validation_code,
          receipt: result.receipt_sequence_validation_code,
        },
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Sequence with ID ${params.id} not found`,
        };
      }
      if (error.status === 409) {
        return {
          success: false,
          error: `Sequence ID ${params.id} is already registered`,
        };
      }
      throw error;
    }
  },
};