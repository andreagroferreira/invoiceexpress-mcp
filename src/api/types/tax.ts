export interface Tax {
  id: number;
  name: string;
  value: number;
  region: string;
  code?: string;
  default_tax: number;
}

export interface CreateTaxRequest {
  name: string;
  value: string;
  region: string;
  code?: string;
  default_tax?: string;
}

export interface UpdateTaxRequest {
  name: string;
  value: string;
  region?: string;
  code?: string;
  default_tax?: string;
}

export interface TaxListParams {
  // No specific parameters for listing taxes
}