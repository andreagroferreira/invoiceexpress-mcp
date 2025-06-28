import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { McpServer } from '../server/McpServer.js';

export interface McpTool extends Tool {
  handler: (args: any, server: McpServer) => Promise<any>;
}