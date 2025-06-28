import type { McpTool } from '../types.js';
import type { CreateTaxRequest } from '../../api/types/tax.js';
import { z } from 'zod';

const paramsSchema = z.object({
  name: z.string().describe('Tax name (e.g., "IVA23")'),
  value: z.string().describe('Tax value in percentage (e.g., "23.0")'),
  region: z.string().describe('Tax region (e.g., "PT", "ES")'),
  code: z.string().optional().describe('Tax code (e.g., "NOR")'),
  default_tax: z.enum(['0', '1']).optional()
    .describe('Set as default tax (1) or not (0)'),
});

export const createTaxTool: McpTool = {
  name: 'tax_create',
  description: 'Create a new tax',
  inputSchema: {
    type: 'object',
    required: ['name', 'value', 'region'],
    properties: {
      name: { type: 'string', description: 'Tax name (e.g., "IVA23")' },
      value: { type: 'string', description: 'Tax value in percentage (e.g., "23.0")' },
      region: { type: 'string', description: 'Tax region (e.g., "PT", "ES")' },
      code: { type: 'string', description: 'Tax code (e.g., "NOR")' },
      default_tax: { 
        type: 'string', 
        enum: ['0', '1'],
        description: 'Set as default tax (1) or not (0)' 
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const taxData: CreateTaxRequest = {
      name: params.name,
      value: params.value,
      region: params.region,
      code: params.code,
      default_tax: params.default_tax,
    };

    const result = await server.taxesEndpoint.create(taxData);
    
    return {
      success: true,
      tax: result,
      message: `Tax "${result.name}" created successfully with value ${result.value}%`,
    };
  },
};