import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type {
  ClientBalance,
  UpdateInitialBalanceRequest,
  RegularizationResponse,
  CreateRegularizationRequest,
  CreateTreasuryMovementRequest,
} from '../types/treasury.js';

export class TreasuryEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  private formatDateToPT(date: string): string {
    if (date.includes('/')) return date;
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  async getClientBalance(clientId: number): Promise<ClientBalance> {
    const response = await this.client.get<ClientBalance>(
      `/api/v3/clients/${clientId}/balance.json`
    );
    return response;
  }

  async updateClientInitialBalance(
    clientId: number,
    data: UpdateInitialBalanceRequest
  ): Promise<void> {
    const formattedData = {
      ...data,
      date: this.formatDateToPT(data.date),
    };

    await this.client.put<void>(
      `/api/v3/clients/${clientId}/initial_balance.json`,
      {
        initial_balance: formattedData,
      }
    );
  }

  async getRegularizations(clientId: number): Promise<RegularizationResponse> {
    const response = await this.client.get<RegularizationResponse>(
      `/api/v3/clients/${clientId}/regularization.json`
    );
    return response;
  }

  async createRegularization(
    clientId: number,
    data: CreateRegularizationRequest
  ): Promise<RegularizationResponse> {
    const formattedData = {
      ...data,
      date: this.formatDateToPT(data.date),
    };

    const response = await this.client.post<RegularizationResponse>(
      `/api/v3/clients/${clientId}/regularization.json`,
      {
        regularization: formattedData,
      }
    );
    return response;
  }

  async deleteRegularization(
    clientId: number,
    regularizationId: number
  ): Promise<void> {
    await this.client.delete<void>(
      `/api/v3/clients/${clientId}/regularization/${regularizationId}.json`
    );
  }

  async createTreasuryMovement(
    clientId: number,
    data: CreateTreasuryMovementRequest
  ): Promise<void> {
    const formattedData = {
      ...data,
      date: this.formatDateToPT(data.date),
    };

    await this.client.post<void>(
      `/api/v3/clients/${clientId}/treasury_movements.json`,
      {
        treasury_movement: formattedData,
      }
    );
  }

  async deleteTreasuryMovement(
    clientId: number,
    movementId: number
  ): Promise<void> {
    await this.client.delete<void>(
      `/api/v3/clients/${clientId}/treasury_movements/${movementId}.json`
    );
  }
}