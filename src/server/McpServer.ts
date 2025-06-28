import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { InvoiceExpressClient } from '../api/InvoiceExpressClient.js';
import { InvoicesEndpoint } from '../api/endpoints/invoices.js';
import { ClientsEndpoint } from '../api/endpoints/clients.js';
import { EstimatesEndpoint } from '../api/endpoints/estimates.js';
import { createLogger } from '../utils/logger.js';
import { InvoiceExpressError } from '../utils/errors.js';
import type { Config } from './config.js';
import { toolRegistry } from '../tools/index.js';

const logger = createLogger('McpServer');

export class McpServer {
  private server: Server;
  private apiClient: InvoiceExpressClient;
  public invoicesEndpoint: InvoicesEndpoint;
  public clientsEndpoint: ClientsEndpoint;
  public estimatesEndpoint: EstimatesEndpoint;

  constructor(private readonly config: Config) {
    this.server = new Server(
      {
        name: config.server.name,
        version: config.server.version,
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    this.apiClient = new InvoiceExpressClient({
      apiKey: config.invoiceExpress.apiKey,
      accountName: config.invoiceExpress.accountName,
    });

    this.invoicesEndpoint = new InvoicesEndpoint(this.apiClient);
    this.clientsEndpoint = new ClientsEndpoint(this.apiClient);
    this.estimatesEndpoint = new EstimatesEndpoint(this.apiClient);

    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools = toolRegistry.getAllTools();
      logger.info(`Listing ${tools.length} available tools`);
      return { tools };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      logger.info(`Calling tool: ${name}`, { args });

      try {
        const tool = toolRegistry.getTool(name);
        if (!tool) {
          throw new Error(`Tool ${name} not found`);
        }

        const result = await tool.handler(args, this);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error(`Error calling tool ${name}:`, error);
        
        let errorMessage = 'An unknown error occurred';
        if (error instanceof InvoiceExpressError) {
          errorMessage = `${error.code}: ${error.message}`;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                error: true,
                message: errorMessage,
              }),
            },
          ],
        };
      }
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    logger.info(`${this.config.server.name} v${this.config.server.version} started`);
  }
}