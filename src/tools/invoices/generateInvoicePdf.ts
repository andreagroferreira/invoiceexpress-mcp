import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const generateInvoicePdfSchema = z.object({
  id: z.number().positive(),
  second_copy: z.boolean().default(false),
});

export const generateInvoicePdfTool: McpTool = {
  name: 'invoice_generate_pdf',
  description: 'Generate a PDF for an invoice',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'number',
        description: 'Invoice ID',
      },
      second_copy: {
        type: 'boolean',
        description: 'Generate a second copy of the document (default: false)',
      },
    },
  },
  handler: async (args, server) => {
    const { id, second_copy } = validateInput(generateInvoicePdfSchema, args, 'generate invoice PDF');
    
    const result = await server.invoicesEndpoint.generatePdf(id, second_copy);
    
    return {
      success: true,
      invoice_id: id,
      pdf_url: result.output.pdfUrl,
      is_second_copy: second_copy,
      message: `PDF generated successfully for invoice ${id}`,
    };
  },
};