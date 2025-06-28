import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type { PaginatedResponse } from '../../types/index.js';
import type {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
  ClientListParams,
} from '../types/client.js';

export class ClientsEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  async list(params?: ClientListParams): Promise<PaginatedResponse<Client>> {
    const response = await this.client.get<{
      clients: Client[];
      pagination: {
        current_page: number;
        total_pages: number;
        total_entries: number;
        per_page: number;
      };
    }>('/clients.json', params);

    return {
      data: response.clients,
      pagination: response.pagination,
    };
  }

  async get(id: number): Promise<Client> {
    const response = await this.client.get<{ client: Client }>(`/clients/${id}.json`);
    return response.client;
  }

  async getByCode(code: string): Promise<Client> {
    const response = await this.client.get<{ client: Client }>(`/clients/find-by-code.json`, {
      client_code: code,
    });
    return response.client;
  }

  async create(data: CreateClientRequest): Promise<Client> {
    const response = await this.client.post<{ client: Client }>('/clients.json', {
      client: data,
    });
    return response.client;
  }

  async update(id: number, data: UpdateClientRequest): Promise<Client> {
    const response = await this.client.put<{ client: Client }>(`/clients/${id}.json`, {
      client: data,
    });
    return response.client;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/clients/${id}.json`);
  }

  async listInvoices(
    clientId: number,
    params?: { page?: number; per_page?: number },
  ): Promise<PaginatedResponse<any>> {
    const response = await this.client.get<{
      invoices: any[];
      pagination: {
        current_page: number;
        total_pages: number;
        total_entries: number;
        per_page: number;
      };
    }>(`/clients/${clientId}/invoices.json`, params);

    return {
      data: response.invoices,
      pagination: response.pagination,
    };
  }
}