import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type { PaginatedResponse } from '../../types/index.js';
import type {
  Item,
  CreateItemRequest,
  UpdateItemRequest,
  ItemListParams,
} from '../types/item.js';

export class ItemsEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  async list(params?: ItemListParams): Promise<PaginatedResponse<Item>> {
    const response = await this.client.get<{
      items: Item[];
      pagination: {
        current_page: number;
        total_pages: number;
        total_entries: number;
        per_page: number;
      };
    }>('/items.json', params);

    return {
      data: response.items,
      pagination: response.pagination,
    };
  }

  async get(id: number): Promise<Item> {
    const response = await this.client.get<{ item: Item }>(`/items/${id}.json`);
    return response.item;
  }

  async create(data: CreateItemRequest): Promise<Item> {
    const response = await this.client.post<{ item: Item }>('/items.json', {
      item: data,
    });
    return response.item;
  }

  async update(id: number, data: UpdateItemRequest): Promise<Item> {
    const response = await this.client.put<{ item: Item }>(`/items/${id}.json`, {
      item: data,
    });
    return response.item;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/items/${id}.json`);
  }
}