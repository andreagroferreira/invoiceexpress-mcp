import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type { PaginatedResponse } from '../../types/index.js';
import type {
  Guide,
  GuideType,
  CreateGuideRequest,
  UpdateGuideRequest,
  GuideListParams,
  EmailGuideRequest,
  GuidePdfResponse,
  ChangeGuideStateRequest,
  GuideQrCodeResponse,
} from '../types/guide.js';

export class GuidesEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  private formatDateToPT(date: string): string {
    if (date.includes('/')) return date;
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  private formatDateTimeToPT(datetime: string): string {
    // If already in PT format, return as is
    if (datetime.includes('/')) return datetime;
    
    // Parse ISO datetime and convert to PT format
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  private formatParams(params: GuideListParams): Record<string, any> {
    const formatted: Record<string, any> = {};
    
    if (params.text) formatted['text'] = params.text;
    
    // Required parameters
    formatted['type[]'] = params.type;
    formatted['status[]'] = params.status;
    formatted['non_archived'] = params.non_archived;
    
    if (params.loaded_at?.from) formatted['loaded_at[from]'] = this.formatDateToPT(params.loaded_at.from);
    if (params.loaded_at?.to) formatted['loaded_at[to]'] = this.formatDateToPT(params.loaded_at.to);
    
    if (params.archived !== undefined) formatted['archived'] = params.archived;
    if (params.page) formatted['page'] = params.page;
    if (params.per_page) formatted['per_page'] = params.per_page;
    
    return formatted;
  }

  private formatGuideData(data: CreateGuideRequest | UpdateGuideRequest): any {
    const entries = Object.entries(data);
    if (entries.length === 0) return data;
    const [key, guide] = entries[0]!;
    const formatted: any = { [key]: { ...guide } };
    
    if (guide && guide.date) {
      formatted[key].date = this.formatDateToPT(guide.date);
    }
    
    if (guide && guide.due_date) {
      formatted[key].due_date = this.formatDateToPT(guide.due_date);
    }
    
    if (guide && guide.loaded_at) {
      formatted[key].loaded_at = this.formatDateTimeToPT(guide.loaded_at);
    }
    
    return formatted;
  }

  async list(params: GuideListParams): Promise<PaginatedResponse<Guide>> {
    const formattedParams = this.formatParams(params);
    return this.client.get<PaginatedResponse<Guide>>('/guides.json', formattedParams);
  }

  async get(id: number, type: GuideType = 'shippings'): Promise<{ [key: string]: Guide }> {
    const endpoint = this.getEndpointForType(type);
    return this.client.get<{ [key: string]: Guide }>(`/${endpoint}/${id}.json`);
  }

  async create(data: CreateGuideRequest): Promise<{ [key: string]: Guide }> {
    const guideType = Object.keys(data)[0];
    if (!guideType) {
      throw new Error('Invalid guide data');
    }
    const endpoint = this.getEndpointFromKey(guideType);
    const formattedData = this.formatGuideData(data);
    return this.client.post<{ [key: string]: Guide }>(`/${endpoint}.json`, formattedData);
  }

  async update(id: number, data: UpdateGuideRequest): Promise<{ [key: string]: Guide }> {
    const guideType = Object.keys(data)[0];
    if (!guideType) {
      throw new Error('Invalid guide data');
    }
    const endpoint = this.getEndpointFromKey(guideType);
    const formattedData = this.formatGuideData(data);
    return this.client.put<{ [key: string]: Guide }>(`/${endpoint}/${id}.json`, formattedData);
  }

  async sendByEmail(id: number, emailData: EmailGuideRequest, type: GuideType = 'shippings'): Promise<void> {
    const endpoint = this.getEndpointForType(type);
    await this.client.post<void>(`/${endpoint}/${id}/email-document.json`, emailData);
  }

  async generatePdf(id: number, type: GuideType = 'shippings'): Promise<GuidePdfResponse> {
    const endpoint = this.getEndpointForType(type);
    return this.client.get<GuidePdfResponse>(`/api/pdf/${endpoint}/${id}.json`);
  }

  async changeState(id: number, stateData: ChangeGuideStateRequest): Promise<void> {
    const guideType = Object.keys(stateData)[0];
    if (!guideType) {
      throw new Error('Invalid state data');
    }
    const endpoint = this.getEndpointFromKey(guideType);
    await this.client.put<void>(`/${endpoint}/${id}/change-state.json`, stateData);
  }

  async getQrCode(id: number): Promise<GuideQrCodeResponse> {
    return this.client.get<GuideQrCodeResponse>(`/api/qr_codes/${id}.json`);
  }

  private getEndpointForType(type: GuideType): string {
    switch (type) {
      case 'shippings':
        return 'shippings';
      case 'transports':
        return 'transports';
      case 'devolutions':
        return 'devolutions';
      default:
        return 'shippings';
    }
  }

  private getEndpointFromKey(key: string): string {
    switch (key) {
      case 'shipping':
        return 'shippings';
      case 'transport':
        return 'transports';
      case 'devolution':
        return 'devolutions';
      default:
        return 'shippings';
    }
  }
}