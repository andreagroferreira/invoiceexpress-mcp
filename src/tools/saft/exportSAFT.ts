import type { McpTool } from '../types.js';
import type { SAFTExportParams } from '../../api/types/saft.js';
import { z } from 'zod';

const paramsSchema = z.object({
  month: z.string().regex(/^(0?[1-9]|1[0-2])$/, 'Month must be 1-12').describe('Month for SAF-T generation (1-12)'),
  year: z.string().regex(/^\d{4}$/, 'Year must be 4 digits').describe('Year for SAF-T generation (e.g., 2024)'),
});

export const exportSAFTTool: McpTool = {
  name: 'saft_export',
  description: 'Export SAF-T (Standard Audit File for Tax) for a specific month and year',
  inputSchema: {
    type: 'object',
    required: ['month', 'year'],
    properties: {
      month: { 
        type: 'string', 
        description: 'Month for SAF-T generation (1-12)',
        pattern: '^(0?[1-9]|1[0-2])$'
      },
      year: { 
        type: 'string', 
        description: 'Year for SAF-T generation (e.g., 2024)',
        pattern: '^\\d{4}$'
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const saftParams: SAFTExportParams = {
      month: params.month,
      year: params.year,
    };

    const result = await server.saftEndpoint.export(saftParams);
    
    if (result.status === 'processing') {
      return {
        success: true,
        status: 'processing',
        message: result.message || `SAF-T file generation started for ${params.month}/${params.year}. The file is being generated, please try again in a few moments.`,
        info: 'SAF-T files may take some time to generate. Please retry this command in a few minutes to check if the file is ready.',
      };
    }
    
    if (result.url) {
      return {
        success: true,
        status: 'ready',
        message: `SAF-T file for ${params.month}/${params.year} is ready for download`,
        download_url: result.url,
        info: 'The SAF-T file must be submitted to the Portuguese Tax Authority by the 5th of the following month.',
      };
    }
    
    return {
      success: true,
      result,
    };
  },
};