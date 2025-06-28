import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type { PaginatedResponse } from '../../types/index.js';
import type {
  Invoice,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  InvoiceListParams,
  DocumentType,
  EmailInvoiceRequest,
  GeneratePdfResponse,
  ChangeStateRequest,
  RelatedDocumentsResponse,
  GeneratePaymentRequest,
  PaymentReceipt,
  CancelPaymentRequest,
  QrCodeResponse,
} from '../types/invoice.js';

export class InvoicesEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  private formatDateToPT(date: string): string {
    if (date.includes('/')) return date;
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  private formatParams(params: InvoiceListParams): Record<string, any> {
    const formatted: Record<string, any> = {};
    
    if (params.type) formatted['type[]'] = params.type;
    if (params.status) formatted['status[]'] = params.status;
    if (params.non_archived !== undefined) formatted['non_archived'] = params.non_archived;
    if (params.text) formatted['text'] = params.text;
    if (params.reference) formatted['reference'] = params.reference;
    if (params.date_from) formatted['date[from]'] = this.formatDateToPT(params.date_from);
    if (params.date_to) formatted['date[to]'] = this.formatDateToPT(params.date_to);
    if (params.due_date_from) formatted['due_date[from]'] = this.formatDateToPT(params.due_date_from);
    if (params.due_date_to) formatted['due_date[to]'] = this.formatDateToPT(params.due_date_to);
    if (params.total_before_taxes_from) formatted['total_before_taxes[from]'] = params.total_before_taxes_from;
    if (params.total_before_taxes_to) formatted['total_before_taxes[to]'] = params.total_before_taxes_to;
    if (params.page) formatted['page'] = params.page;
    if (params.per_page) formatted['per_page'] = params.per_page;
    
    return formatted;
  }

  async list(params?: InvoiceListParams): Promise<PaginatedResponse<Invoice>> {
    const formattedParams = params ? this.formatParams(params) : {};
    
    const response = await this.client.get<{
      invoices: Invoice[];
      pagination: {
        current_page: number;
        total_pages: number;
        total_entries: number;
        per_page: number;
      };
    }>('/invoices.json', formattedParams);

    return {
      data: response.invoices,
      pagination: response.pagination,
    };
  }

  async get(id: number, documentType: DocumentType = 'invoices'): Promise<Invoice> {
    const response = await this.client.get<{ invoice: Invoice }>(`/${documentType}/${id}.json`);
    return response.invoice;
  }

  async create(data: CreateInvoiceRequest, documentType: DocumentType = 'invoices'): Promise<Invoice> {
    const requestData = {
      ...data,
      date: this.formatDateToPT(data.date),
      due_date: this.formatDateToPT(data.due_date),
    };

    const response = await this.client.post<{ invoice: Invoice }>(`/${documentType}.json`, {
      invoice: requestData,
    });
    return response.invoice;
  }

  async update(id: number, data: UpdateInvoiceRequest, documentType: DocumentType = 'invoices'): Promise<void> {
    const requestData = { ...data };
    if (data.date) requestData.date = this.formatDateToPT(data.date);
    if (data.due_date) requestData.due_date = this.formatDateToPT(data.due_date);

    await this.client.put(`/${documentType}/${id}.json`, {
      invoice: requestData,
    });
  }

  async changeState(
    id: number, 
    state: ChangeStateRequest['state'], 
    documentType: DocumentType = 'invoices',
    message?: string
  ): Promise<Invoice> {
    const requestBody: any = { invoice: { state } };
    if (message && state === 'canceled') {
      requestBody.invoice.message = message;
    }
    
    const response = await this.client.put<{ invoice: Invoice }>(
      `/${documentType}/${id}/change-state.json`,
      requestBody,
    );
    return response.invoice;
  }

  async sendByEmail(
    id: number,
    emailData: EmailInvoiceRequest,
    documentType: DocumentType = 'invoices'
  ): Promise<void> {
    await this.client.put(`/${documentType}/${id}/email-document.json`, {
      message: emailData,
    });
  }

  async generatePdf(id: number, secondCopy = false): Promise<GeneratePdfResponse> {
    const params = secondCopy ? { second_copy: true } : {};
    return this.client.get<GeneratePdfResponse>(`/api/pdf/${id}.json`, params);
  }

  async getRelatedDocuments(id: number, documentType: DocumentType = 'invoices'): Promise<RelatedDocumentsResponse> {
    return this.client.get<RelatedDocumentsResponse>(`/${documentType}/${id}/related_documents.json`);
  }

  async generatePayment(id: number, paymentData: GeneratePaymentRequest): Promise<PaymentReceipt> {
    const requestData = {
      ...paymentData,
      receipt: {
        ...paymentData.receipt,
        payment_date: this.formatDateToPT(paymentData.receipt.payment_date),
      },
    };

    return this.client.post<PaymentReceipt>(`/documents/${id}/partial_payments.json`, requestData);
  }

  async cancelPayment(receiptId: number, message: string): Promise<PaymentReceipt> {
    const requestData: CancelPaymentRequest = {
      receipt: {
        state: 'canceled',
        message,
      },
    };

    return this.client.put<PaymentReceipt>(`/receipts/${receiptId}/change-state.json`, requestData);
  }

  async getQrCode(documentId: number): Promise<QrCodeResponse> {
    return this.client.get<QrCodeResponse>(`/api/qr_codes/${documentId}.json`);
  }
}