import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput, emailSchema } from '../../utils/validation.js';

const sendInvoiceEmailSchema = z.object({
  id: z.number().positive(),
  document_type: z.enum(['invoices', 'invoice_receipts', 'simplified_invoices', 'credit_notes', 'debit_notes']).default('invoices'),
  email: emailSchema,
  save_email: z.boolean().default(false),
  subject: z.string().optional(),
  body: z.string().optional(),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  include_logo: z.boolean().default(true),
});

export const sendInvoiceEmailTool: McpTool = {
  name: 'invoice_send_email',
  description: 'Send an invoice by email to a client',
  inputSchema: {
    type: 'object',
    required: ['id', 'email'],
    properties: {
      id: {
        type: 'number',
        description: 'Invoice ID',
      },
      document_type: {
        type: 'string',
        description: 'Document type (default: invoices)',
        enum: ['invoices', 'invoice_receipts', 'simplified_invoices', 'credit_notes', 'debit_notes'],
      },
      email: {
        type: 'string',
        description: 'Recipient email address',
      },
      save_email: {
        type: 'boolean',
        description: 'Save email to client profile (default: false)',
      },
      subject: {
        type: 'string',
        description: 'Email subject (optional, uses default if not provided)',
      },
      body: {
        type: 'string',
        description: 'Email body (optional, uses default if not provided)',
      },
      cc: {
        type: 'string',
        description: 'CC email addresses (comma-separated)',
      },
      bcc: {
        type: 'string',
        description: 'BCC email addresses (comma-separated)',
      },
      include_logo: {
        type: 'boolean',
        description: 'Include company logo in email (default: true)',
      },
    },
  },
  handler: async (args, server) => {
    const { id, document_type, email, save_email, subject, body, cc, bcc, include_logo } = 
      validateInput(sendInvoiceEmailSchema, args, 'send invoice email');
    
    const emailData = {
      client: {
        email,
        save: save_email ? '1' as const : '0' as const,
      },
      subject,
      body,
      cc,
      bcc,
      logo: include_logo ? '1' as const : '0' as const,
    };
    
    await server.invoicesEndpoint.sendByEmail(id, emailData, document_type);
    
    return {
      success: true,
      message: `Invoice ${id} sent successfully to ${email}`,
      details: {
        invoice_id: id,
        recipient: email,
        cc: cc || null,
        bcc: bcc || null,
        email_saved: save_email,
      },
    };
  },
};