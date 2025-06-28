import type { McpTool } from '../types.js';
import type { UpdateClientRequest } from '../../api/types/client.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The client ID to update'),
  name: z.string().optional().describe('Client name'),
  code: z.string().optional().describe('Client code'),
  email: z.string().optional().describe('Client email'),
  language: z.string().optional().describe('Client language (pt/en/es/fr)'),
  address: z.string().optional().describe('Client address'),
  city: z.string().optional().describe('Client city'),
  postal_code: z.string().optional().describe('Client postal code'),
  country: z.string().optional().describe('Client country'),
  fiscal_id: z.string().optional().describe('Client fiscal ID'),
  website: z.string().optional().describe('Client website'),
  phone: z.string().optional().describe('Client phone'),
  fax: z.string().optional().describe('Client fax'),
  observations: z.string().optional().describe('Client observations'),
  send_options: z.string().optional().describe('Send options (email, normal_mail, both)'),
  payment_days: z.number().optional().describe('Payment days'),
  tax_exemption_code: z.string().optional().describe('Tax exemption code'),
});

export const updateClientTool: McpTool = {
  name: 'client_update',
  description: 'Update an existing client',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number', description: 'The client ID to update' },
      name: { type: 'string', description: 'Client name' },
      code: { type: 'string', description: 'Client code' },
      email: { type: 'string', description: 'Client email' },
      language: { type: 'string', description: 'Client language (pt/en/es/fr)' },
      address: { type: 'string', description: 'Client address' },
      city: { type: 'string', description: 'Client city' },
      postal_code: { type: 'string', description: 'Client postal code' },
      country: { type: 'string', description: 'Client country' },
      fiscal_id: { type: 'string', description: 'Client fiscal ID' },
      website: { type: 'string', description: 'Client website' },
      phone: { type: 'string', description: 'Client phone' },
      fax: { type: 'string', description: 'Client fax' },
      observations: { type: 'string', description: 'Client observations' },
      send_options: { type: 'string', description: 'Send options (email, normal_mail, both)' },
      payment_days: { type: 'number', description: 'Payment days' },
      tax_exemption_code: { type: 'string', description: 'Tax exemption code' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    const { id, ...updateData } = params;
    
    const clientData: UpdateClientRequest = updateData as UpdateClientRequest;
    const result = await server.clientsEndpoint.update(id, clientData);
    
    return {
      success: true,
      client: result,
      message: `Client ${result.name} (ID: ${result.id}) updated successfully`,
    };
  },
};