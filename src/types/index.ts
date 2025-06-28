export interface ApiConfig {
  apiKey: string;
  accountName: string;
  baseUrl?: string;
  timeout?: number;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_entries: number;
    per_page: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: ApiError;
};