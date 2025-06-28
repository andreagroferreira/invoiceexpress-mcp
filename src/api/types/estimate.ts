export type EstimateType = 'quotes' | 'proformas' | 'fees_notes';

export type EstimateStatus = 'draft' | 'sent' | 'accepted' | 'refused' | 'canceled';

export interface Estimate {
  id: number;
  type: EstimateType;
  status: EstimateStatus;
  date: string;
  due_date: string;
  reference?: string;
  observations?: string;
  retention?: string;
  tax_exemption?: string;
  sequence_number?: string;
  manual_sequence_number?: string;
  client: EstimateClient;
  items: EstimateItem[];
  sum: number;
  discount: number;
  before_taxes: number;
  taxes: number;
  total: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface EstimateClient {
  id?: number;
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
}

export interface EstimateItem {
  name: string;
  description?: string;
  unit_price: number;
  quantity: number;
  unit?: string;
  discount?: number;
  tax?: {
    name: string;
    value: number;
  };
}

export interface EstimateListParams {
  text?: string;
  type?: EstimateType[];
  status?: EstimateStatus[];
  date?: {
    from?: string;
    to?: string;
  };
  due_date?: {
    from?: string;
    to?: string;
  };
  total_before_taxes?: {
    from?: number;
    to?: number;
  };
  non_archived?: boolean;
  archived?: boolean;
  page?: number;
  per_page?: number;
}

export interface CreateEstimateRequest {
  [key: string]: {
    date: string;
    due_date: string;
    client: EstimateClient;
    items: EstimateItem[];
    reference?: string;
    observations?: string;
    retention?: string;
    tax_exemption?: string;
    sequence_id?: string;
    manual_sequence_number?: string;
  };
}

export interface UpdateEstimateRequest {
  [key: string]: {
    date?: string;
    due_date?: string;
    client?: EstimateClient;
    items?: EstimateItem[];
    reference?: string;
    observations?: string;
    retention?: string;
    tax_exemption?: string;
    sequence_id?: string;
    manual_sequence_number?: string;
  };
}

export interface EmailEstimateRequest {
  message: {
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    logo?: boolean;
  };
}

export interface EstimatePdfResponse {
  output: {
    pdfUrl: string;
  };
}

export interface ChangeEstimateStateRequest {
  [key: string]: {
    state: 'finalized' | 'deleted' | 'accept' | 'refuse' | 'canceled';
    message?: string;
  };
}

export interface EstimateStateTransition {
  from: EstimateStatus[];
  to: string;
  requiresMessage?: boolean;
}

export const ESTIMATE_STATE_TRANSITIONS: Record<string, EstimateStateTransition> = {
  finalized: {
    from: ['draft'],
    to: 'sent',
  },
  deleted: {
    from: ['draft'],
    to: 'deleted',
  },
  accept: {
    from: ['sent', 'refused'],
    to: 'accepted',
  },
  refuse: {
    from: ['sent', 'accepted'],
    to: 'refused',
  },
  canceled: {
    from: ['sent', 'accepted', 'refused'],
    to: 'canceled',
    requiresMessage: true,
  },
};