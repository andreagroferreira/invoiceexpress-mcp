import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The guide ID'),
});

export const getGuideQrCodeTool: McpTool = {
  name: 'guide_get_qrcode',
  description: 'Get QR code for a finalized guide',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The guide ID' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    const result = await server.guidesEndpoint.getQrCode(params.id);
    
    return result;
  },
};