import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

dotenvConfig();

const configSchema = z.object({
  invoiceExpress: z.object({
    apiKey: z.string().min(1, 'API key is required'),
    accountName: z.string().min(1, 'Account name is required'),
  }),
  server: z.object({
    name: z.string().default('mcp-invoice-express'),
    version: z.string().default('1.0.0'),
  }),
  environment: z.enum(['development', 'production', 'test']).default('development'),
  logging: z.object({
    level: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
    format: z.enum(['json', 'pretty']).default('json'),
  }),
  cache: z.object({
    ttl: z.number().default(300),
    checkPeriod: z.number().default(60),
  }),
  rateLimit: z.object({
    maxRequests: z.number().default(60),
    windowMs: z.number().default(60000),
  }),
});

export type Config = z.infer<typeof configSchema>;

export function loadConfig(): Config {
  const rawConfig = {
    invoiceExpress: {
      apiKey: process.env['INVOICE_EXPRESS_API_KEY'] || '',
      accountName: process.env['INVOICE_EXPRESS_ACCOUNT_NAME'] || '',
    },
    server: {
      name: process.env['MCP_SERVER_NAME'] || undefined,
      version: process.env['MCP_SERVER_VERSION'] || undefined,
    },
    environment: process.env['NODE_ENV'] || undefined,
    logging: {
      level: process.env['LOG_LEVEL'] || undefined,
      format: process.env['LOG_FORMAT'] || undefined,
    },
    cache: {
      ttl: process.env['CACHE_TTL'] ? parseInt(process.env['CACHE_TTL'], 10) : undefined,
      checkPeriod: process.env['CACHE_CHECK_PERIOD'] 
        ? parseInt(process.env['CACHE_CHECK_PERIOD'], 10) 
        : undefined,
    },
    rateLimit: {
      maxRequests: process.env['RATE_LIMIT_MAX_REQUESTS'] 
        ? parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'], 10) 
        : undefined,
      windowMs: process.env['RATE_LIMIT_WINDOW_MS'] 
        ? parseInt(process.env['RATE_LIMIT_WINDOW_MS'], 10) 
        : undefined,
    },
  };

  const result = configSchema.safeParse(rawConfig);
  
  if (!result.success) {
    const errors = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
  
  return result.data;
}