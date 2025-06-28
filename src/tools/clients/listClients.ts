import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const listClientsSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  fiscal_id: z.string().optional(),
  page: z.number().positive().default(1),
  per_page: z.number().min(1).max(100).default(20),
});

export const listClientsTool: McpTool = {
  name: 'client_list',
  description: 'List clients with optional filters',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Filter by client name (partial match)',
      },
      code: {
        type: 'string',
        description: 'Filter by client code',
      },
      fiscal_id: {
        type: 'string',
        description: 'Filter by fiscal ID (NIF)',
      },
      page: {
        type: 'number',
        description: 'Page number (default: 1)',
      },
      per_page: {
        type: 'number',
        description: 'Items per page (default: 20, max: 100)',
      },
    },
  },
  handler: async (args, server) => {
    const params = validateInput(listClientsSchema, args, 'list clients');
    const result = await server.clientsEndpoint.list(params);
    
    return {
      clients: result.data.map((client) => ({
        id: client.id,
        name: client.name,
        code: client.code,
        email: client.email,
        fiscal_id: client.fiscal_id,
        city: client.city,
        country: client.country,
      })),
      pagination: result.pagination,
      summary: {
        total_clients: result.pagination.total_entries,
        showing: `${(result.pagination.current_page - 1) * result.pagination.per_page + 1}-${
          Math.min(
            result.pagination.current_page * result.pagination.per_page,
            result.pagination.total_entries,
          )
        }`,
      },
    };
  },
};