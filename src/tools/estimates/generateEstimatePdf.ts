import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The estimate ID'),
  type: z.enum(['quotes', 'proformas', 'fees_notes']).default('quotes')
    .describe('The type of estimate (default: quotes)'),
});

export const generateEstimatePdfTool: McpTool = {
  name: 'estimate_generate_pdf',
  description: 'Generate a PDF for an estimate',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The estimate ID' },
      type: { 
        type: 'string', 
        enum: ['quotes', 'proformas', 'fees_notes'],
        default: 'quotes',
        description: 'The type of estimate (default: quotes)'
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    const result = await server.estimatesEndpoint.generatePdf(params.id, params.type);
    
    return result;
  },
};