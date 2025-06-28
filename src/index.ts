#!/usr/bin/env node

import { McpServer } from './server/McpServer.js';
import { loadConfig } from './server/config.js';
import { createLogger } from './utils/logger.js';

const logger = createLogger('Main');

interface CLIArgs {
  transport: 'stdio' | 'http' | 'sse';
  port: number;
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const result: CLIArgs = {
    transport: 'stdio',
    port: 3000,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--transport':
        if (i + 1 < args.length && args[i + 1]) {
          const transport = args[i + 1]!;
          if (['stdio', 'http', 'sse'].includes(transport)) {
            result.transport = transport as 'stdio' | 'http' | 'sse';
          } else {
            console.error(`Invalid transport: ${transport}. Must be one of: stdio, http, sse`);
            process.exit(1);
          }
          i++;
        }
        break;
      case '--port':
        if (i + 1 < args.length && args[i + 1]) {
          const port = parseInt(args[i + 1]!, 10);
          if (!isNaN(port) && port > 0 && port < 65536) {
            result.port = port;
          } else {
            console.error(`Invalid port: ${args[i + 1]}. Must be a number between 1 and 65535`);
            process.exit(1);
          }
          i++;
        }
        break;
      case '--help':
      case '-h':
        console.log(`
InvoiceExpress MCP Server

Usage: invoiceexpress-mcp [options]

Options:
  --transport <stdio|http|sse>  Transport to use (default: stdio)
  --port <number>              Port to listen on for http/sse transport (default: 3000)
  --help, -h                   Show this help message

Environment Variables:
  INVOICEEXPRESS_API_KEY       Your InvoiceExpress API key (required)
  INVOICEEXPRESS_ACCOUNT_NAME  Your InvoiceExpress account name (required)
  MCP_MODE                     Set to 'silent' to reduce logging

Examples:
  invoiceexpress-mcp                           # Start with stdio transport
  invoiceexpress-mcp --transport http         # Start HTTP server on port 3000
  invoiceexpress-mcp --transport sse --port 8080  # Start SSE server on port 8080
        `);
        process.exit(0);
    }
  }

  return result;
}

async function main(): Promise<void> {
  try {
    const cliArgs = parseArgs();
    
    logger.info('Starting InvoiceExpress MCP server...', {
      transport: cliArgs.transport,
      port: cliArgs.transport !== 'stdio' ? cliArgs.port : undefined,
    });
    
    const config = loadConfig();
    const server = new McpServer(config);
    
    // TODO: Add HTTP/SSE transport support in future versions
    if (cliArgs.transport !== 'stdio') {
      logger.warn(`${cliArgs.transport} transport not yet implemented. Using stdio transport.`);
    }
    
    await server.start();
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

main().catch((error) => {
  logger.error('Fatal error:', error);
  process.exit(1);
});