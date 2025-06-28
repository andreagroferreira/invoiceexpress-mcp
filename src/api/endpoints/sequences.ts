import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type {
  Sequence,
  CreateSequenceRequest,
  SequenceListParams,
} from '../types/sequence.js';

export class SequencesEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  async list(params?: SequenceListParams): Promise<Sequence[]> {
    const response = await this.client.get<{ sequences: Sequence[] }>('/sequences.json', params);
    return response.sequences;
  }

  async get(id: number): Promise<Sequence> {
    const response = await this.client.get<{ sequence: Sequence }>(`/sequences/${id}.json`);
    return response.sequence;
  }

  async create(data: CreateSequenceRequest): Promise<Sequence> {
    const response = await this.client.post<{ sequence: Sequence }>('/sequences.json', {
      sequence: data,
    });
    return response.sequence;
  }

  async setAsCurrent(id: number): Promise<void> {
    await this.client.put<void>(`/sequences/${id}/set_current.json`);
  }

  async register(id: number): Promise<Sequence> {
    const response = await this.client.put<{ sequence: Sequence }>(`/sequences/${id}/register.json`);
    return response.sequence;
  }
}