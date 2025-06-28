export interface ItemTax {
  id?: number;
  name: string;
  value?: number;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  unit_price: number;
  unit?: string;
  tax?: ItemTax;
  created_at?: string;
  updated_at?: string;
}

export interface ItemListParams {
  page?: number;
  per_page?: number;
}

export interface CreateItemRequest {
  name: string;
  description: string;
  unit_price: number;
  unit?: string;
  tax?: ItemTax;
}

export interface UpdateItemRequest {
  name?: string;
  description?: string;
  unit_price?: number;
  unit?: string;
  tax?: ItemTax;
}