export interface Account {
  id?: number;
  name?: string;
  organization_name: string;
  fiscal_id?: string;
  email: string;
  state?: string;
  at_configured?: boolean;
  trial?: boolean;
  url?: string;
  api_key?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
}

export interface CreateAccountRequest {
  organization_name: string;
  email: string;
  password: string;
  terms: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  fiscal_id?: string;
  tax_country?: string;
  language?: string;
  marketing?: string;
}

export interface UpdateAccountRequest {
  organization_name: string;
  email: string;
  terms: string;
  fiscal_id?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  credentials?: {
    username?: string;
    password?: string;
  };
}

export interface CreateAccountForExistingUserRequest extends CreateAccountRequest {
  // Same as CreateAccountRequest but for existing users
}

export interface ATCommunicationRequest {
  at_subuser: string;
  at_password: string;
  communication_type: 'auto' | 'guides' | 'manual' | 'portal_at';
}