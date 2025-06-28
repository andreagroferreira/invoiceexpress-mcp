import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { McpTool } from './types.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('ToolRegistry');

export class ToolRegistry {
  private tools: Map<string, McpTool> = new Map();

  register(tool: McpTool): void {
    if (this.tools.has(tool.name)) {
      logger.warn(`Tool ${tool.name} is already registered. Overwriting.`);
    }
    this.tools.set(tool.name, tool);
    logger.info(`Registered tool: ${tool.name}`);
  }

  getTool(name: string): McpTool | undefined {
    return this.tools.get(name);
  }

  getAllTools(): Tool[] {
    return Array.from(this.tools.values()).map(({ handler, ...tool }) => tool);
  }

  getToolNames(): string[] {
    return Array.from(this.tools.keys());
  }
}