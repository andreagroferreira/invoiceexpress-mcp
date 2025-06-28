export interface Currency {
  symbol: string;
  code: string;
}

export interface InitialBalance {
  value: number;
  created_at: string;
  observation?: string | null;
}

export interface Balance {
  with_vat: number;
  without_vat: number;
}

export interface RemainingBalance {
  total: number;
  value: number;
}

export interface ClientBalance {
  currency: Currency;
  initial_balance: InitialBalance;
  balance: Balance;
  overdue_balance: Balance;
  remaining_balance: RemainingBalance;
}

export interface UpdateInitialBalanceRequest {
  value: number;
  date: string;
  observation?: string;
}

export interface Regularization {
  id: number;
  number: string;
  value: number;
  date: string;
  observation?: string | null;
}

export interface RegularizationResponse {
  regularization: Regularization[];
  pagination: {
    total_entries: number;
    current_page: number;
    total_pages: number;
    per_page: number;
  };
}

export interface CreateRegularizationRequest {
  value: number;
  date: string;
  observation?: string;
}

export interface TreasuryMovement {
  id?: number;
  value: number;
  movement_type: 'Payment' | 'Reimbursement';
  payment_method?: string;
  date: string;
  serie?: string;
  observation?: string;
}

export interface CreateTreasuryMovementRequest {
  value: number;
  movement_type: 'Payment' | 'Reimbursement';
  payment_method?: string;
  date: string;
  serie?: string;
  observation?: string;
}