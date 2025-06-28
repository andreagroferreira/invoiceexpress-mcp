import { z } from 'zod';

import type { McpTool } from '../types.js';
import { validateInput } from '../../utils/validation.js';

const getRelatedDocumentsSchema = z.object({
  id: z.number().positive(),
  document_type: z.enum(['invoices', 'invoice_receipts', 'simplified_invoices', 'credit_notes', 'debit_notes']).default('invoices'),
});

export const getRelatedDocumentsTool: McpTool = {
  name: 'invoice_related_documents',
  description: 'Get all documents related to a specific invoice (credit notes, debit notes, receipts, etc.)',
  inputSchema: {
    type: 'object',
    required: ['id'],
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
    },
  },
  handler: async (args, server) => {
    const { id, document_type } = validateInput(getRelatedDocumentsSchema, args, 'get related documents');
    
    const response = await server.invoicesEndpoint.getRelatedDocuments(id, document_type);
    
    return {
      success: true,
      document_id: id,
      document_type,
      related_documents_count: response.related_documents.length,
      related_documents: response.related_documents.map(doc => ({
        id: doc.document.id,
        type: doc.document.type,
        sequence_number: doc.document.sequence_number,
        inverted_sequence_number: doc.document.inverted_sequence_number,
        date: doc.document.date,
        due_date: doc.document.due_date,
        reference: doc.document.reference,
        total: doc.document.total,
        currency: doc.document.currency,
      })),
    };
  },
};