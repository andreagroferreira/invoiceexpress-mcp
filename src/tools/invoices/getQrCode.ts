import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const getQrCodeSchema = z.object({
  document_id: z.number().positive(),
});

export const getQrCodeTool: McpTool = {
  name: 'invoice_get_qrcode',
  description: 'Get the QR code URL for a finalized invoice or document',
  inputSchema: {
    type: 'object',
    required: ['document_id'],
    properties: {
      document_id: {
        type: 'number',
        description: 'Document ID (must be finalized, canceled, or settled)',
      },
    },
  },
  handler: async (args, server) => {
    const { document_id } = validateInput(getQrCodeSchema, args, 'get QR code');
    
    const response = await server.invoicesEndpoint.getQrCode(document_id);
    
    return {
      success: true,
      document_id,
      qr_code_url: response.qr_code.url,
      message: `QR code retrieved successfully for document ${document_id}`,
    };
  },
};