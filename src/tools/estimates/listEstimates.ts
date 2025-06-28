import type { McpTool } from '../types.js';
import type { EstimateListParams } from '../../api/types/estimate.js';
import { z } from 'zod';

const paramsSchema = z.object({
  text: z.string().optional().describe('Search for estimate, client, or item details'),
  type: z.array(z.enum(['quotes', 'proformas', 'fees_notes'])).optional()
    .describe('Filter by estimate type'),
  status: z.array(z.enum(['draft', 'sent', 'accepted', 'refused', 'canceled'])).optional()
    .describe('Filter by estimate status'),
  date_from: z.string().optional().describe('Filter by start date (YYYY-MM-DD)'),
  date_to: z.string().optional().describe('Filter by end date (YYYY-MM-DD)'),
  due_date_from: z.string().optional().describe('Filter by start due date (YYYY-MM-DD)'),
  due_date_to: z.string().optional().describe('Filter by end due date (YYYY-MM-DD)'),
  total_before_taxes_from: z.number().optional().describe('Filter by minimum total'),
  total_before_taxes_to: z.number().optional().describe('Filter by maximum total'),
  non_archived: z.boolean().optional().describe('Include non-archived estimates'),
  archived: z.boolean().optional().describe('Include archived estimates'),
  page: z.number().optional().describe('Page number for pagination'),
  per_page: z.number().optional().describe('Number of results per page'),
});

export const listEstimatesTool: McpTool = {
  name: 'estimate_list',
  description: 'List estimates with optional filters (quotes, proformas, fees notes)',
  inputSchema: {
    type: 'object',
    properties: {
      text: { type: 'string', description: 'Search for estimate, client, or item details' },
      type: { 
        type: 'array', 
        items: { type: 'string', enum: ['quotes', 'proformas', 'fees_notes'] },
        description: 'Filter by estimate type'
      },
      status: { 
        type: 'array', 
        items: { type: 'string', enum: ['draft', 'sent', 'accepted', 'refused', 'canceled'] },
        description: 'Filter by estimate status'
      },
      date_from: { type: 'string', description: 'Filter by start date (YYYY-MM-DD)' },
      date_to: { type: 'string', description: 'Filter by end date (YYYY-MM-DD)' },
      due_date_from: { type: 'string', description: 'Filter by start due date (YYYY-MM-DD)' },
      due_date_to: { type: 'string', description: 'Filter by end due date (YYYY-MM-DD)' },
      total_before_taxes_from: { type: 'number', description: 'Filter by minimum total' },
      total_before_taxes_to: { type: 'number', description: 'Filter by maximum total' },
      non_archived: { type: 'boolean', description: 'Include non-archived estimates' },
      archived: { type: 'boolean', description: 'Include archived estimates' },
      page: { type: 'number', description: 'Page number for pagination' },
      per_page: { type: 'number', description: 'Number of results per page' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    const estimateParams: EstimateListParams = {
      text: params.text,
      type: params.type,
      status: params.status,
      date: {
        from: params.date_from,
        to: params.date_to,
      },
      due_date: {
        from: params.due_date_from,
        to: params.due_date_to,
      },
      total_before_taxes: {
        from: params.total_before_taxes_from,
        to: params.total_before_taxes_to,
      },
      non_archived: params.non_archived,
      archived: params.archived,
      page: params.page,
      per_page: params.per_page,
    };

    // Remove empty objects
    if (!estimateParams.date?.from && !estimateParams.date?.to) {
      delete estimateParams.date;
    }
    if (!estimateParams.due_date?.from && !estimateParams.due_date?.to) {
      delete estimateParams.due_date;
    }
    if (estimateParams.total_before_taxes?.from === undefined && 
        estimateParams.total_before_taxes?.to === undefined) {
      delete estimateParams.total_before_taxes;
    }

    const result = await server.estimatesEndpoint.list(estimateParams);
    
    return result;
  },
};