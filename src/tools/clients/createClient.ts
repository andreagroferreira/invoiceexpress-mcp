import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput, emailSchema, vatNumberSchema } from '../../utils/validation.js';

const createClientSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  email: emailSchema.optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  fiscal_id: vatNumberSchema.optional(),
  website: z.string().url().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  observations: z.string().optional(),
  send_invoices_to_client: z.boolean().optional(),
  send_estimates_to_client: z.boolean().optional(),
});

export const createClientTool: McpTool = {
  name: 'client_create',
  description: 'Create a new client',
  inputSchema: {
    type: 'object',
    required: ['name', 'code'],
    properties: {
      name: {
        type: 'string',
        description: 'Client name',
      },
      code: {
        type: 'string',
        description: 'Client code (unique identifier)',
      },
      email: {
        type: 'string',
        description: 'Client email address',
      },
      address: {
        type: 'string',
        description: 'Client address',
      },
      city: {
        type: 'string',
        description: 'Client city',
      },
      postal_code: {
        type: 'string',
        description: 'Client postal code',
      },
      country: {
        type: 'string',
        description: 'Client country',
      },
      fiscal_id: {
        type: 'string',
        description: 'Client fiscal ID (NIF - 9 digits)',
      },
      website: {
        type: 'string',
        description: 'Client website URL',
      },
      phone: {
        type: 'string',
        description: 'Client phone number',
      },
      fax: {
        type: 'string',
        description: 'Client fax number',
      },
      observations: {
        type: 'string',
        description: 'Additional notes about the client',
      },
      send_invoices_to_client: {
        type: 'boolean',
        description: 'Whether to send invoices to client automatically',
      },
      send_estimates_to_client: {
        type: 'boolean',
        description: 'Whether to send estimates to client automatically',
      },
    },
  },
  handler: async (args, server) => {
    const clientData = validateInput(createClientSchema, args, 'create client');
    const client = await server.clientsEndpoint.create(clientData);
    
    return {
      success: true,
      client: {
        id: client.id,
        name: client.name,
        code: client.code,
        email: client.email,
        fiscal_id: client.fiscal_id,
        created_at: client.created_at,
      },
      message: `Client ${client.name} created successfully with code ${client.code}`,
    };
  },
};