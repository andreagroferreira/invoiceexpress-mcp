import type { McpTool } from '../types.js';
import type { UpdateTaxRequest } from '../../api/types/tax.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The tax ID to update'),
  name: z.string().describe('Tax name (e.g., "IVA23")'),
  value: z.string().describe('Tax value in percentage (e.g., "23.0")'),
  region: z.string().optional().describe('Tax region (e.g., "PT", "ES")'),
  code: z.string().optional().describe('Tax code (e.g., "NOR")'),
  default_tax: z.enum(['0', '1']).optional()
    .describe('Set as default tax (1) or not (0)'),
});

export const updateTaxTool: McpTool = {
  name: 'tax_update',
  description: 'Update an existing tax',
  inputSchema: {
    type: 'object',
    required: ['id', 'name', 'value'],
    properties: {
      id: { type: 'number', description: 'The tax ID to update' },
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
    
    const taxData: UpdateTaxRequest = {
      name: params.name,
      value: params.value,
      region: params.region,
      code: params.code,
      default_tax: params.default_tax,
    };

    try {
      await server.taxesEndpoint.update(params.id, taxData);
      
      return {
        success: true,
        message: `Tax ID ${params.id} updated successfully`,
      };
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        return {
          success: false,
          error: `Tax with ID ${params.id} not found`,
        };
      }
      if (error.status === 422) {
        return {
          success: false,
          error: `Invalid tax data: ${error.message}`,
        };
      }
      throw error;
    }
  },
};