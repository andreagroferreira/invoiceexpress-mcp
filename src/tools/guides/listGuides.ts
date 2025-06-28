import type { McpTool } from '../types.js';
import type { GuideListParams } from '../../api/types/guide.js';
import { z } from 'zod';

const paramsSchema = z.object({
  text: z.string().optional().describe('Search for guide, client, or item details'),
  type: z.array(z.enum(['shippings', 'transports', 'devolutions']))
    .describe('Filter by guide type (required)'),
  status: z.array(z.enum(['draft', 'sent', 'canceled', 'second_copy']))
    .describe('Filter by guide status (required)'),
  loaded_at_from: z.string().optional().describe('Filter by start loaded date (YYYY-MM-DD)'),
  loaded_at_to: z.string().optional().describe('Filter by end loaded date (YYYY-MM-DD)'),
  non_archived: z.boolean().describe('Include non-archived guides (required)'),
  archived: z.boolean().optional().describe('Include archived guides'),
  page: z.number().optional().describe('Page number for pagination'),
  per_page: z.number().optional().describe('Number of results per page'),
});

export const listGuidesTool: McpTool = {
  name: 'guide_list',
  description: 'List guides with required filters (shippings, transports, devolutions)',
  inputSchema: {
    type: 'object',
    required: ['type', 'status', 'non_archived'],
    properties: {
      text: { type: 'string', description: 'Search for guide, client, or item details' },
      type: { 
        type: 'array', 
        items: { type: 'string', enum: ['shippings', 'transports', 'devolutions'] },
        description: 'Filter by guide type (required)'
      },
      status: { 
        type: 'array', 
        items: { type: 'string', enum: ['draft', 'sent', 'canceled', 'second_copy'] },
        description: 'Filter by guide status (required)'
      },
      loaded_at_from: { type: 'string', description: 'Filter by start loaded date (YYYY-MM-DD)' },
      loaded_at_to: { type: 'string', description: 'Filter by end loaded date (YYYY-MM-DD)' },
      non_archived: { type: 'boolean', description: 'Include non-archived guides (required)' },
      archived: { type: 'boolean', description: 'Include archived guides' },
      page: { type: 'number', description: 'Page number for pagination' },
      per_page: { type: 'number', description: 'Number of results per page' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const guideParams: GuideListParams = {
      text: params.text,
      type: params.type,
      status: params.status,
      loaded_at: {
        from: params.loaded_at_from,
        to: params.loaded_at_to,
      },
      non_archived: params.non_archived,
      archived: params.archived,
      page: params.page,
      per_page: params.per_page,
    };

    // Remove empty objects
    if (!guideParams.loaded_at?.from && !guideParams.loaded_at?.to) {
      delete guideParams.loaded_at;
    }

    const result = await server.guidesEndpoint.list(guideParams);
    
    return result;
  },
};