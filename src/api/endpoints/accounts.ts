import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type {
  Account,
  CreateAccountRequest,
  UpdateAccountRequest,
  CreateAccountForExistingUserRequest,
  ATCommunicationRequest,
} from '../types/account.js';

export class AccountsEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  async get(id: number): Promise<Account> {
    const response = await this.client.get<{ account: Account }>(`/api/accounts/${id}/get.json`);
    return response.account;
  }

  async create(data: CreateAccountRequest): Promise<Account> {
    const response = await this.client.post<{ account: Account }>('/api/accounts/create.json', {
      account: data,
    });
    return response.account;
  }

  async update(id: number, data: UpdateAccountRequest): Promise<void> {
    await this.client.put<void>(`/api/accounts/${id}/update.json`, {
      account: data,
    });
  }

  async createForExistingUser(data: CreateAccountForExistingUserRequest): Promise<Account> {
    const response = await this.client.post<{ account: Account }>('/api/accounts/create_already_user.json', {
      account: data,
    });
    return response.account;
  }

  async updateATCommunication(data: ATCommunicationRequest): Promise<{ success: string }> {
    const response = await this.client.post<{ success: string }>('/api/v3/accounts/at_communication.json', {
      at_communication: data,
    });
    return response;
  }
}