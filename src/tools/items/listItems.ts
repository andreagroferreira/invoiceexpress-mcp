import type { McpTool } from '../types.js';
import { z } from 'zod';

const paramsSchema = z.object({
  page: z.number().optional().describe('Page number for pagination'),
  per_page: z.number().optional().describe('Number of results per page (10, 20, or 30)'),
});

export const listItemsTool: McpTool = {
  name: 'item_list',
  description: 'List items/products with pagination',
  inputSchema: {
    type: 'object',
    properties: {
      page: { type: 'number', description: 'Page number for pagination' },
      per_page: { type: 'number', description: 'Number of results per page (10, 20, or 30)' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const result = await server.itemsEndpoint.list(params);
    
    return {
      success: true,
      items: result.data,
      pagination: result.pagination,
      message: `Found ${result.data.length} items`,
    };
  },
};