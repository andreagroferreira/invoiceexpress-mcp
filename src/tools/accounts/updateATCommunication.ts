import type { McpTool } from '../types.js';
import type { ATCommunicationRequest } from '../../api/types/account.js';
import { z } from 'zod';

const paramsSchema = z.object({
  at_subuser: z.string().describe('AT subuser in format "123456789/X"'),
  at_password: z.string().describe('AT password (will be Base64 encoded)'),
  communication_type: z.enum(['auto', 'guides', 'manual', 'portal_at'])
    .describe('Communication type with Tax Authority'),
});

export const updateATCommunicationTool: McpTool = {
  name: 'account_update_at_communication',
  description: 'Configure Tax Authority (AT) communication settings for the account',
  inputSchema: {
    type: 'object',
    required: ['at_subuser', 'at_password', 'communication_type'],
    properties: {
      at_subuser: { 
        type: 'string', 
        description: 'AT subuser in format "123456789/X"' 
      },
      at_password: { 
        type: 'string', 
        description: 'AT password (will be Base64 encoded)' 
      },
      communication_type: { 
        type: 'string',
        enum: ['auto', 'guides', 'manual', 'portal_at'],
        description: 'Communication type with Tax Authority' 
      },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    // Base64 encode the password
    const encodedPassword = Buffer.from(params.at_password).toString('base64');
    
    const atCommunicationData: ATCommunicationRequest = {
      at_subuser: params.at_subuser,
      at_password: encodedPassword,
      communication_type: params.communication_type,
    };

    try {
      await server.accountsEndpoint.updateATCommunication(atCommunicationData);
      
      return {
        success: true,
        message: 'AT communication settings updated successfully',
        communication_type: params.communication_type,
        at_subuser: params.at_subuser,
      };
    } catch (error: any) {
      if (error.status === 422) {
        return {
          success: false,
          error: `Invalid AT communication data: ${error.message}`,
        };
      }
      throw error;
    }
  },
};