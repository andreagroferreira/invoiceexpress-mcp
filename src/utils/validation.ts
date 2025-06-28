import { z } from 'zod';

import { ValidationError } from './errors.js';

export function validateInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context?: string,
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      
      const message = context
        ? `Validation failed for ${context}: ${details.map((d) => `${d.path} - ${d.message}`).join(', ')}`
        : `Validation failed: ${details.map((d) => `${d.path} - ${d.message}`).join(', ')}`;
      
      throw new ValidationError(message, { errors: details });
    }
    throw error;
  }
}

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  perPage: z.number().int().min(1).max(100).default(20),
});

export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format');

export const datePTSchema = z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date must be in DD/MM/YYYY format');

export const dateFlexibleSchema = z.string().regex(
  /^(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4})$/,
  'Date must be in YYYY-MM-DD or DD/MM/YYYY format'
);

export const emailSchema = z.string().email();

export const vatNumberSchema = z.string().regex(/^\d{9}$/, 'VAT number must be 9 digits');