export type DocumentType = 
  | 'invoices'
  | 'invoice_receipts'
  | 'simplified_invoices'
  | 'credit_notes'
  | 'debit_notes';

export interface Invoice {
  id: number;
  status: InvoiceStatus;
  date: string;
  due_date: string;
  reference: string;
  observations?: string;
  retention?: string;
  tax_exemption?: string;
  sequence_number?: string;
  manual_sequence_number?: string;
  client: InvoiceClient;
  items: InvoiceItem[];
  sum: number;
  discount: number;
  before_taxes: number;
  taxes: number;
  total: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceClient {
  id: number;
  name: string;
  code: string;
  email?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  fiscal_id?: string;
  website?: string;
  phone?: string;
  fax?: string;
  observations?: string;
}

export interface InvoiceItem {
  name: string;
  description?: string;
  unit_price: number;
  quantity: number;
  unit?: string;
  discount?: number;
  tax?: InvoiceTax;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total: number;
}

export interface InvoiceTax {
  id: number;
  name: string;
  value: number;
}

export type InvoiceStatus = 
  | 'draft'
  | 'sent'
  | 'final'
  | 'canceled'
  | 'second_copy'
  | 'settled'
  | 'unsettled';

export type InvoiceType = 
  | 'Invoice'
  | 'SimplifiedInvoice'
  | 'InvoiceReceipt'
  | 'CreditNote'
  | 'DebitNote';

export interface CreateInvoiceRequest {
  date: string;
  due_date: string;
  client: {
    id?: number;
    name?: string;
    code?: string;
    email?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    fiscal_id?: string;
  };
  items: Array<{
    name: string;
    description?: string;
    unit_price: number;
    quantity: number;
    unit?: string;
    discount?: number;
    tax?: {
      id: number;
    };
  }>;
  reference?: string;
  observations?: string;
  retention?: number;
  tax_exemption?: string;
  manual_sequence_number?: string;
  sequence_id?: number;
  currency_code?: string;
  global_discount?: number;
}

export interface UpdateInvoiceRequest {
  date?: string;
  due_date?: string;
  client?: {
    id?: number;
    name?: string;
    code?: string;
    email?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    fiscal_id?: string;
  };
  items?: Array<{
    name: string;
    description?: string;
    unit_price: number;
    quantity: number;
    unit?: string;
    discount?: number;
    tax?: {
      id: number;
    };
  }>;
  reference?: string;
  observations?: string;
  retention?: number;
  tax_exemption?: string;
  sequence_id?: number;
  currency_code?: string;
  global_discount?: number;
}

export interface InvoiceListParams {
  type?: InvoiceType[];
  status?: InvoiceStatus[];
  non_archived?: boolean;
  text?: string;
  date_from?: string;
  date_to?: string;
  due_date_from?: string;
  due_date_to?: string;
  total_before_taxes_from?: number;
  total_before_taxes_to?: number;
  reference?: string;
  page?: number;
  per_page?: number;
}

export interface EmailInvoiceRequest {
  client: {
    email: string;
    save?: '0' | '1';
  };
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
  logo?: '0' | '1';
}

export interface GeneratePdfResponse {
  output: {
    pdfUrl: string;
  };
}

export interface ChangeStateRequest {
  state: 'finalized' | 'canceled' | 'deleted';
  message?: string;
}

export interface RelatedDocument {
  document: {
    id: number;
    type: string;
    sequence_number: string;
    inverted_sequence_number?: string;
    date: string;
    due_date?: string;
    reference?: string;
    total: number;
    currency: string;
  };
}

export interface RelatedDocumentsResponse {
  related_documents: RelatedDocument[];
}

export interface GeneratePaymentRequest {
  receipt: {
    payment_amount: number;
    payment_date: string;
    payment_method?: 'MB' | 'TB' | 'CC' | 'CD' | 'CH' | 'CO' | 'CS' | 'DE' | 'LC' | 'NU' | 'OU' | 'PR' | 'TR';
    payment_mechanism?: 'Dinheiro' | 'Cheque' | 'Débito Direto' | 'Transferência Bancária' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Compensação de saldos em conta corrente' | 'Vale Postal' | 'Outros meios aqui não assinalados';
    observations?: string;
    series?: {
      id: number;
    };
  };
}

export interface PaymentReceipt {
  receipt: {
    id: number;
    status: string;
    date: string;
    sequence_number: string;
    inverted_sequence_number: string;
    atcud: string;
    total: number;
    currency: string;
    related_documents_count: number;
  };
}

export interface CancelPaymentRequest {
  receipt: {
    state: 'canceled';
    message: string;
  };
}

export interface QrCodeResponse {
  qr_code: {
    url: string;
  };
}