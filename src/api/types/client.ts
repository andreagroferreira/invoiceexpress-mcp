export interface Client {
  id: number;
  name: string;
  code: string;
  email?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  fiscal_id?: string;
  website?: string;
  phone?: string;
  fax?: string;
  preferred_contact?: ClientContact;
  preferred_contact_id?: number;
  observations?: string;
  send_invoices_to_client?: boolean;
  send_estimates_to_client?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientContact {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  mobile?: string;
}

export interface CreateClientRequest {
  name: string;
  code: string;
  email?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  fiscal_id?: string;
  website?: string;
  phone?: string;
  fax?: string;
  observations?: string;
  send_invoices_to_client?: boolean;
  send_estimates_to_client?: boolean;
}

export interface UpdateClientRequest {
  name?: string;
  code?: string;
  email?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  fiscal_id?: string;
  website?: string;
  phone?: string;
  fax?: string;
  observations?: string;
  send_invoices_to_client?: boolean;
  send_estimates_to_client?: boolean;
}

export interface ClientListParams {
  name?: string;
  code?: string;
  fiscal_id?: string;
  page?: number;
  per_page?: number;
}