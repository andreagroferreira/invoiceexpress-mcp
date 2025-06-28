import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The guide ID'),
  type: z.enum(['shippings', 'transports', 'devolutions']).default('shippings')
    .describe('The type of guide (default: shippings)'),
});

export const generateGuidePdfTool: McpTool = {
  name: 'guide_generate_pdf',
  description: 'Generate a PDF for a guide',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The guide ID' },
      type: { 
        type: 'string', 
        enum: ['shippings', 'transports', 'devolutions'],
        default: 'shippings',
        description: 'The type of guide (default: shippings)'
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    const result = await server.guidesEndpoint.generatePdf(params.id, params.type);
    
    return result;
  },
};