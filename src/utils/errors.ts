export class InvoiceExpressError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'InvoiceExpressError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends InvoiceExpressError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends InvoiceExpressError {
  constructor(message = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends InvoiceExpressError {
  constructor(message = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 'RATE_LIMIT_ERROR', 429, { retryAfter });
    this.name = 'RateLimitError';
  }
}

export class NotFoundError extends InvoiceExpressError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super(message, 'NOT_FOUND_ERROR', 404);
    this.name = 'NotFoundError';
  }
}

export function isInvoiceExpressError(error: unknown): error is InvoiceExpressError {
  return error instanceof InvoiceExpressError;
}