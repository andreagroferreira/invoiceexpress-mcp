import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  client_id: z.number().describe('The client ID'),
  page: z.number().optional().describe('Page number for pagination'),
  per_page: z.number().optional().describe('Number of results per page'),
});

export const listClientInvoicesTool: McpTool = {
  name: 'client_list_invoices',
  description: 'List all invoices for a specific client',
  inputSchema: {
    type: 'object',
    required: ['client_id'],
    properties: {
      client_id: { type: 'number', description: 'The client ID' },
      page: { type: 'number', description: 'Page number for pagination' },
      per_page: { type: 'number', description: 'Number of results per page' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const result = await server.clientsEndpoint.listInvoices(params.client_id, {
      page: params.page,
      per_page: params.per_page,
    });
    
    return {
      success: true,
      invoices: result.data,
      pagination: result.pagination,
      message: `Found ${result.data.length} invoices for client ID ${params.client_id}`,
    };
  },
};