export type GuideType = 'shippings' | 'transports' | 'devolutions';

export type GuideStatus = 'draft' | 'sent' | 'canceled' | 'second_copy';

export interface GuideAddress {
  detail: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface Guide {
  id: number;
  type: GuideType;
  status: GuideStatus;
  date: string;
  due_date: string;
  loaded_at: string;
  license_plate?: string;
  reference?: string;
  observations?: string;
  retention?: string;
  tax_exemption?: string;
  sequence_number?: string;
  manual_sequence_number?: string;
  address_from: GuideAddress;
  address_to: GuideAddress;
  client: GuideClient;
  items: GuideItem[];
  sum: number;
  discount: number;
  before_taxes: number;
  taxes: number;
  total: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface GuideClient {
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

export interface GuideItem {
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

export interface GuideListParams {
  text?: string;
  type: GuideType[];
  status: GuideStatus[];
  loaded_at?: {
    from?: string;
    to?: string;
  };
  non_archived: boolean;
  archived?: boolean;
  page?: number;
  per_page?: number;
}

export interface CreateGuideRequest {
  [key: string]: {
    date: string;
    due_date: string;
    loaded_at: string;
    address_from: GuideAddress;
    address_to: GuideAddress;
    client: GuideClient;
    items: GuideItem[];
    license_plate?: string;
    reference?: string;
    observations?: string;
    retention?: string;
    tax_exemption?: string;
    sequence_id?: string;
    manual_sequence_number?: string;
  };
}

export interface UpdateGuideRequest {
  [key: string]: {
    date?: string;
    due_date?: string;
    loaded_at?: string;
    address_from?: GuideAddress;
    address_to?: GuideAddress;
    client?: GuideClient;
    items?: GuideItem[];
    license_plate?: string;
    reference?: string;
    observations?: string;
    retention?: string;
    tax_exemption?: string;
    sequence_id?: string;
    manual_sequence_number?: string;
  };
}

export interface EmailGuideRequest {
  message: {
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    body: string;
    logo?: boolean;
  };
}

export interface GuidePdfResponse {
  output: {
    pdfUrl: string;
  };
}

export interface ChangeGuideStateRequest {
  [key: string]: {
    state: 'finalized' | 'deleted' | 'canceled';
    message?: string;
  };
}

export interface GuideQrCodeResponse {
  qr_code: {
    url: string;
  };
}

export interface GuideStateTransition {
  from: GuideStatus[];
  to: string;
  requiresMessage?: boolean;
}

export const GUIDE_STATE_TRANSITIONS: Record<string, GuideStateTransition> = {
  finalized: {
    from: ['draft'],
    to: 'sent',
  },
  deleted: {
    from: ['draft'],
    to: 'deleted',
  },
  canceled: {
    from: ['sent'],
    to: 'canceled',
    requiresMessage: true,
  },
};