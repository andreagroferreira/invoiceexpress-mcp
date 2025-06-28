import type { McpTool } from '../types.js';
import type { UpdateAccountRequest } from '../../api/types/account.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The account ID to update'),
  organization_name: z.string().describe('Company/organization name'),
  email: z.string().email().describe('Account email address'),
  terms: z.enum(['0', '1']).describe('Accept terms (1) or not (0)'),
  fiscal_id: z.string().optional().describe('Fiscal/tax ID'),
  address: z.string().optional().describe('Company address'),
  postal_code: z.string().optional().describe('Postal code (format: DDDD-DDD)'),
  city: z.string().optional().describe('City'),
  credentials: z.object({
    username: z.string().optional(),
    password: z.string().optional(),
  }).optional().describe('Update credentials'),
});

export const updateAccountTool: McpTool = {
  name: 'account_update',
  description: 'Update an existing InvoiceExpress account',
  inputSchema: {
    type: 'object',
    required: ['id', 'organization_name', 'email', 'terms'],
    properties: {
      id: { type: 'number', description: 'The account ID to update' },
      organization_name: { type: 'string', description: 'Company/organization name' },
      email: { type: 'string', description: 'Account email address' },
      terms: { 
        type: 'string', 
        enum: ['0', '1'],
        description: 'Accept terms (1) or not (0)' 
      },
      fiscal_id: { type: 'string', description: 'Fiscal/tax ID' },
      address: { type: 'string', description: 'Company address' },
      postal_code: { type: 'string', description: 'Postal code (format: DDDD-DDD)' },
      city: { type: 'string', description: 'City' },
      credentials: {
        type: 'object',
        description: 'Update credentials',
        properties: {
          username: { type: 'string', description: 'Username' },
          password: { type: 'string', description: 'Password' },
        },
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const { id, ...accountData } = params;

    try {
      await server.accountsEndpoint.update(id, accountData as UpdateAccountRequest);
      
      return {
        success: true,
        message: `Account ID ${id} updated successfully`,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Account with ID ${id} not found`,
        };
      }
      if (error.status === 422) {
        return {
          success: false,
          error: `Invalid account data: ${error.message}`,
        };
      }
      throw error;
    }
  },
};