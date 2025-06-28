import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import pLimit from 'p-limit';

import type { ApiConfig } from '../types/index.js';
import { createLogger } from '../utils/logger.js';
import { 
  InvoiceExpressError, 
  AuthenticationError, 
  RateLimitError,
  NotFoundError 
} from '../utils/errors.js';

const logger = createLogger('InvoiceExpressClient');

export class InvoiceExpressClient {
  private readonly client: AxiosInstance;
  private readonly rateLimiter: ReturnType<typeof pLimit>;

  constructor(config: ApiConfig) {
    const baseURL = config.baseUrl ?? `https://${config.accountName}.app.invoicexpress.com`;
    
    this.client = axios.create({
      baseURL,
      timeout: config.timeout ?? 30000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: {
        api_key: config.apiKey,
      },
    });

    this.rateLimiter = pLimit(parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] ?? '60', 10));

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        // Ensure api_key is always present in params
        if (!config.params) {
          config.params = {};
        }
        // Only add api_key if not already present (to avoid duplicates)
        if (!config.params.api_key) {
          config.params.api_key = this.client.defaults.params?.api_key;
        }
        
        logger.debug('API Request', {
          method: config.method,
          url: config.url,
          params: config.params,
        });
        return config;
      },
      (error: unknown) => {
        logger.error('Request interceptor error', { error });
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response) => {
        logger.debug('API Response', {
          status: response.status,
          url: response.config.url,
        });
        return response;
      },
      (error: unknown) => {
        if (axios.isAxiosError(error)) {
          return Promise.reject(this.handleAxiosError(error));
        }
        return Promise.reject(error);
      },
    );
  }

  private handleAxiosError(error: AxiosError): InvoiceExpressError {
    const status = error.response?.status;
    const message = this.extractErrorMessage(error);

    logger.error('API Error', {
      status,
      message,
      url: error.config?.url,
      method: error.config?.method,
    });

    switch (status) {
      case 401:
        return new AuthenticationError(message);
      case 404:
        return new NotFoundError('Resource', error.config?.url);
      case 429:
        const retryAfter = error.response?.headers['retry-after'];
        return new RateLimitError(message, retryAfter ? parseInt(retryAfter as string, 10) : undefined);
      default:
        return new InvoiceExpressError(
          message,
          'API_ERROR',
          status,
          { response: error.response?.data },
        );
    }
  }

  private extractErrorMessage(error: AxiosError): string {
    if (error.response?.data && typeof error.response.data === 'object') {
      const data = error.response.data as Record<string, unknown>;
      if (typeof data['message'] === 'string') return data['message'];
      if (typeof data['error'] === 'string') return data['error'];
      if (data['errors'] && Array.isArray(data['errors'])) {
        return data['errors'].join(', ');
      }
    }
    return error.message || 'An unknown error occurred';
  }

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.rateLimiter(async () => {
      try {
        const response = await this.client.request<T>(config);
        return response.data;
      } catch (error) {
        if (error instanceof InvoiceExpressError) {
          throw error;
        }
        throw new InvoiceExpressError(
          'Unexpected error occurred',
          'UNKNOWN_ERROR',
          undefined,
          { originalError: error },
        );
      }
    });
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>({ method: 'GET', url, params });
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    return this.request<T>({ method: 'POST', url, data });
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data });
  }

  async patch<T>(url: string, data?: unknown): Promise<T> {
    return this.request<T>({ method: 'PATCH', url, data });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', url });
  }
}