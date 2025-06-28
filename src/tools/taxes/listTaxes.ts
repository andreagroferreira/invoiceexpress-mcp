import type { McpTool } from '../types.js';

export const listTaxesTool: McpTool = {
  name: 'tax_list',
  description: 'List all taxes',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: async (_, server) => {
    const result = await server.taxesEndpoint.list();
    
    return {
      success: true,
      taxes: result,
      message: `Found ${result.length} taxes`,
    };
  },
};