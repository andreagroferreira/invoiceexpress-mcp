import type { InvoiceExpressClient } from '../InvoiceExpressClient.js';
import type {
  SAFTExportParams,
  SAFTExportResponse,
} from '../types/saft.js';
import { InvoiceExpressError } from '../../utils/errors.js';
import { createLogger } from '../../utils/logger.js';

const logger = createLogger('SAFTEndpoint');

export class SAFTEndpoint {
  constructor(private readonly client: InvoiceExpressClient) {}

  async export(params: SAFTExportParams): Promise<SAFTExportResponse> {
    try {
      // Make the request using the underlying axios client to get access to full response
      const fullResponse = await this.client['client'].get<SAFTExportResponse>(
        '/api/export_saft.json',
        { params }
      );

      const response = fullResponse.data;
      const statusCode = fullResponse.status;

      // Handle 202 Accepted (processing) status
      if (statusCode === 202) {
        logger.info('SAF-T export started, processing...', params);
        return {
          message: response.message || 'SAF-T file generation has started. Please try again in a few moments.',
          status: 'processing',
        };
      }

      // Handle 200 OK (ready) status
      if (response.url) {
        logger.info('SAF-T export completed', params);
        return {
          url: response.url,
          status: 'ready',
        };
      }

      return response;
    } catch (error: any) {
      if (error.status === 422) {
        throw new InvoiceExpressError(
          'VALIDATION_ERROR',
          'Invalid parameters for SAF-T export. Please check month and year.',
          error.status
        );
      }
      if (error.status === 500) {
        throw new InvoiceExpressError(
          'SERVER_ERROR',
          'SAF-T generation failed. Please try again later.',
          error.status
        );
      }
      throw error;
    }
  }
}