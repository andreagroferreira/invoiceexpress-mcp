import type { McpTool } from '../types.js';

export const listSequencesTool: McpTool = {
  name: 'sequence_list',
  description: 'List all document sequences',
  inputSchema: {
    type: 'object',
    properties: {},
  },
  handler: async (_, server) => {
    const result = await server.sequencesEndpoint.list();
    
    return {
      success: true,
      sequences: result,
      message: `Found ${result.length} sequences`,
    };
  },
};