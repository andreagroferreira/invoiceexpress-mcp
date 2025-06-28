import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type { PaginatedResponse } from '../../types/index.js';
import type {
  Estimate,
  EstimateType,
  CreateEstimateRequest,
  UpdateEstimateRequest,
  EstimateListParams,
  EmailEstimateRequest,
  EstimatePdfResponse,
  ChangeEstimateStateRequest,
} from '../types/estimate.js';

export class EstimatesEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  private formatDateToPT(date: string): string {
    if (date.includes('/')) return date;
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  private formatParams(params: EstimateListParams): Record<string, any> {
    const formatted: Record<string, any> = {};
    
    if (params.text) formatted['text'] = params.text;
    if (params.type?.length) formatted['type[]'] = params.type;
    if (params.status?.length) formatted['status[]'] = params.status;
    
    if (params.date?.from) formatted['date[from]'] = this.formatDateToPT(params.date.from);
    if (params.date?.to) formatted['date[to]'] = this.formatDateToPT(params.date.to);
    
    if (params.due_date?.from) formatted['due_date[from]'] = this.formatDateToPT(params.due_date.from);
    if (params.due_date?.to) formatted['due_date[to]'] = this.formatDateToPT(params.due_date.to);
    
    if (params.total_before_taxes?.from !== undefined) {
      formatted['total_before_taxes[from]'] = params.total_before_taxes.from;
    }
    if (params.total_before_taxes?.to !== undefined) {
      formatted['total_before_taxes[to]'] = params.total_before_taxes.to;
    }
    
    if (params.non_archived !== undefined) formatted['non_archived'] = params.non_archived;
    if (params.archived !== undefined) formatted['archived'] = params.archived;
    if (params.page) formatted['page'] = params.page;
    if (params.per_page) formatted['per_page'] = params.per_page;
    
    return formatted;
  }

  private formatEstimateData(data: CreateEstimateRequest | UpdateEstimateRequest): any {
    const entries = Object.entries(data);
    if (entries.length === 0) return data;
    const [key, estimate] = entries[0];
    const formatted: any = { [key]: { ...estimate } };
    
    if (estimate && estimate.date) {
      formatted[key].date = this.formatDateToPT(estimate.date);
    }
    
    if (estimate && estimate.due_date) {
      formatted[key].due_date = this.formatDateToPT(estimate.due_date);
    }
    
    return formatted;
  }

  async list(params?: EstimateListParams): Promise<PaginatedResponse<Estimate>> {
    const formattedParams = params ? this.formatParams(params) : undefined;
    return this.client.get<PaginatedResponse<Estimate>>('/estimates.json', formattedParams);
  }

  async get(id: number, type: EstimateType = 'quotes'): Promise<{ [key: string]: Estimate }> {
    const endpoint = this.getEndpointForType(type);
    return this.client.get<{ [key: string]: Estimate }>(`/${endpoint}/${id}.json`);
  }


  async create(data: CreateEstimateRequest): Promise<{ [key: string]: Estimate }> {
    const estimateType = Object.keys(data)[0];
    if (!estimateType) {
      throw new Error('Invalid estimate data');
    }
    const endpoint = this.getEndpointFromKey(estimateType);
    const formattedData = this.formatEstimateData(data);
    return this.client.post<{ [key: string]: Estimate }>(`/${endpoint}.json`, formattedData);
  }

  async update(id: number, data: UpdateEstimateRequest): Promise<{ [key: string]: Estimate }> {
    const estimateType = Object.keys(data)[0];
    if (!estimateType) {
      throw new Error('Invalid estimate data');
    }
    const endpoint = this.getEndpointFromKey(estimateType);
    const formattedData = this.formatEstimateData(data);
    return this.client.put<{ [key: string]: Estimate }>(`/${endpoint}/${id}.json`, formattedData);
  }

  async sendByEmail(id: number, emailData: EmailEstimateRequest, type: EstimateType = 'quotes'): Promise<void> {
    const endpoint = this.getEndpointForType(type);
    await this.client.post<void>(`/${endpoint}/${id}/email-document.json`, emailData);
  }

  async generatePdf(id: number, type: EstimateType = 'quotes'): Promise<EstimatePdfResponse> {
    const endpoint = this.getEndpointForType(type);
    return this.client.get<EstimatePdfResponse>(`/api/pdf/${endpoint}/${id}.json`);
  }

  async changeState(id: number, stateData: ChangeEstimateStateRequest): Promise<void> {
    const estimateType = Object.keys(stateData)[0];
    if (!estimateType) {
      throw new Error('Invalid state data');
    }
    const endpoint = this.getEndpointFromKey(estimateType);
    await this.client.put<void>(`/${endpoint}/${id}/change-state.json`, stateData);
  }

  private getEndpointForType(type: EstimateType): string {
    switch (type) {
      case 'quotes':
        return 'quotes';
      case 'proformas':
        return 'proformas';
      case 'fees_notes':
        return 'fees_notes';
      default:
        return 'quotes';
    }
  }

  private getEndpointFromKey(key: string): string {
    switch (key) {
      case 'quote':
        return 'quotes';
      case 'proforma':
        return 'proformas';
      case 'fees_note':
        return 'fees_notes';
      default:
        return 'quotes';
    }
  }
}