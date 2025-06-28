import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type {
  Tax,
  CreateTaxRequest,
  UpdateTaxRequest,
  TaxListParams,
} from '../types/tax.js';

export class TaxesEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  async list(params?: TaxListParams): Promise<Tax[]> {
    const response = await this.client.get<{ taxes: Tax[] }>('/taxes.json', params);
    return response.taxes;
  }

  async get(id: number): Promise<Tax> {
    const response = await this.client.get<{ tax: Tax }>(`/taxes/${id}.json`);
    return response.tax;
  }

  async create(data: CreateTaxRequest): Promise<Tax> {
    const response = await this.client.post<{ tax: Tax }>('/taxes.json', {
      tax: data,
    });
    return response.tax;
  }

  async update(id: number, data: UpdateTaxRequest): Promise<void> {
    await this.client.put<void>(`/taxes/${id}.json`, {
      tax: data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.client.delete<void>(`/taxes/${id}.json`);
  }
}