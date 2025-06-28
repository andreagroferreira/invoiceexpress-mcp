import type { McpTool } from '../types.js';
import type { EmailGuideRequest } from '../../api/types/guide.js';
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.number().describe('The guide ID'),
  type: z.enum(['shippings', 'transports', 'devolutions']).default('shippings')
    .describe('The type of guide (default: shippings)'),
  to: z.array(z.string()).describe('List of recipient email addresses'),
  cc: z.array(z.string()).optional().describe('List of CC email addresses'),
  bcc: z.array(z.string()).optional().describe('List of BCC email addresses'),
  subject: z.string().describe('Email subject'),
  body: z.string().describe('Email body text'),
  logo: z.boolean().optional().describe('Include company logo in the email'),
});

export const sendGuideEmailTool: McpTool = {
  name: 'guide_send_email',
  description: 'Send a guide by email',
  inputSchema: {
    type: 'object',
    required: ['id', 'to', 'subject', 'body'],
    properties: {
      id: { type: 'number', description: 'The guide ID' },
      type: { 
        type: 'string', 
        enum: ['shippings', 'transports', 'devolutions'],
        default: 'shippings',
        description: 'The type of guide (default: shippings)'
      },
      to: { 
        type: 'array', 
        items: { type: 'string' },
        description: 'List of recipient email addresses' 
      },
      cc: { 
        type: 'array', 
        items: { type: 'string' },
        description: 'List of CC email addresses' 
      },
      bcc: { 
        type: 'array', 
        items: { type: 'string' },
        description: 'List of BCC email addresses' 
      },
      subject: { type: 'string', description: 'Email subject' },
      body: { type: 'string', description: 'Email body text' },
      logo: { type: 'boolean', description: 'Include company logo in the email' },
    },
  },
  handler: async (args, server) => {
    const params = paramsSchema.parse(args);
    
    const emailData: EmailGuideRequest = {
      message: {
        to: params.to,
        cc: params.cc,
        bcc: params.bcc,
        subject: params.subject,
        body: params.body,
        logo: params.logo,
      },
    };

    await server.guidesEndpoint.sendByEmail(params.id, emailData, params.type);
    
    return {
      success: true,
      message: `Guide ${params.id} sent successfully to ${params.to.join(', ')}`,
    };
  },
};