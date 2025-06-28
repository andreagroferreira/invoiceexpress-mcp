import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const getClientSchema = z.object({
  id: z.number().positive().optional(),
  code: z.string().optional(),
}).refine(
  (data) => data.id || data.code,
  'Either id or code must be provided',
);

export const getClientTool: McpTool = {
  name: 'client_get',
  description: 'Get details of a specific client by ID or code',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        description: 'Client ID',
      },
      code: {
        type: 'string',
        description: 'Client code',
      },
    },
  },
  handler: async (args, server) => {
    const { id, code } = validateInput(getClientSchema, args, 'get client');
    
    const client = id 
      ? await server.clientsEndpoint.get(id)
      : await server.clientsEndpoint.getByCode(code!);
    
    return {
      client: {
        id: client.id,
        name: client.name,
        code: client.code,
        email: client.email,
        address: client.address,
        city: client.city,
        postal_code: client.postal_code,
        country: client.country,
        fiscal_id: client.fiscal_id,
        website: client.website,
        phone: client.phone,
        fax: client.fax,
        observations: client.observations,
        send_invoices_to_client: client.send_invoices_to_client,
        send_estimates_to_client: client.send_estimates_to_client,
        created_at: client.created_at,
        updated_at: client.updated_at,
      },
    };
  },
};