#!/usr/bin/env node

import { McpServer } from './server/McpServer.js';
import { loadConfig } from './server/config.js';
import { createLogger } from './utils/logger.js';

const logger = createLogger('Main');

async function main(): Promise<void> {
  try {
    logger.info('Starting MCP Invoice Express server...');
    
    const config = loadConfig();
    const server = new McpServer(config);
    
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