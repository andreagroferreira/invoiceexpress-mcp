import type { McpTool } from '../types.js';
import type { CreateAccountRequest } from '../../api/types/account.js';
import { z } from 'zod';

const paramsSchema = z.object({
  organization_name: z.string().describe('Company/organization name'),
  email: z.string().email().describe('Account email address'),
  password: z.string().describe('Account password'),
  terms: z.enum(['0', '1']).describe('Accept terms (1) or not (0)'),
  first_name: z.string().optional().describe('User first name'),
  last_name: z.string().optional().describe('User last name'),
  phone: z.string().optional().describe('Phone number'),
  fiscal_id: z.string().optional().describe('Fiscal/tax ID'),
  tax_country: z.string().optional().describe('Tax country code'),
  language: z.string().optional().describe('Preferred language'),
  marketing: z.string().optional().describe('Marketing preferences'),
});

export const createAccountTool: McpTool = {
  name: 'account_create',
  description: 'Create a new InvoiceExpress account',
  inputSchema: {
    type: 'object',
    required: ['organization_name', 'email', 'password', 'terms'],
    properties: {
      organization_name: { type: 'string', description: 'Company/organization name' },
      email: { type: 'string', description: 'Account email address' },
      password: { type: 'string', description: 'Account password' },
      terms: { 
        type: 'string', 
        enum: ['0', '1'],
        description: 'Accept terms (1) or not (0)' 
      },
      first_name: { type: 'string', description: 'User first name' },
      last_name: { type: 'string', description: 'User last name' },
      phone: { type: 'string', description: 'Phone number' },
      fiscal_id: { type: 'string', description: 'Fiscal/tax ID' },
      tax_country: { type: 'string', description: 'Tax country code' },
      language: { type: 'string', description: 'Preferred language' },
      marketing: { type: 'string', description: 'Marketing preferences' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const accountData: CreateAccountRequest = params;

    try {
      const result = await server.accountsEndpoint.create(accountData);
      
      return {
        success: true,
        account: result,
        message: `Account "${result.organization_name}" created successfully`,
        credentials: {
          url: result.url,
          api_key: result.api_key,
        },
      };
    } catch (error: any) {
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