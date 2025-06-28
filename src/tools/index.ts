import { ToolRegistry } from './registry.js';
import { 
  listInvoicesTool, 
  createInvoiceTool, 
  getInvoiceTool,
  updateInvoiceTool,
  sendInvoiceEmailTool,
  generateInvoicePdfTool,
  changeInvoiceStateTool,
  getRelatedDocumentsTool,
  generatePaymentTool,
  cancelPaymentTool,
  getQrCodeTool,
} from './invoices/index.js';
import { 
  listClientsTool, 
  createClientTool, 
  getClientTool 
} from './clients/index.js';
import {
  listEstimatesTool,
  getEstimateTool,
  createEstimateTool,
  updateEstimateTool,
  sendEstimateEmailTool,
  generateEstimatePdfTool,
  changeEstimateStateTool,
} from './estimates/index.js';

export const toolRegistry = new ToolRegistry();

// Register invoice tools
toolRegistry.register(listInvoicesTool);
toolRegistry.register(createInvoiceTool);
toolRegistry.register(getInvoiceTool);
toolRegistry.register(updateInvoiceTool);
toolRegistry.register(sendInvoiceEmailTool);
toolRegistry.register(generateInvoicePdfTool);
toolRegistry.register(changeInvoiceStateTool);
toolRegistry.register(getRelatedDocumentsTool);
toolRegistry.register(generatePaymentTool);
toolRegistry.register(cancelPaymentTool);
toolRegistry.register(getQrCodeTool);

// Register client tools
toolRegistry.register(listClientsTool);
toolRegistry.register(createClientTool);
toolRegistry.register(getClientTool);

// Register estimate tools
toolRegistry.register(listEstimatesTool);
toolRegistry.register(getEstimateTool);
toolRegistry.register(createEstimateTool);
toolRegistry.register(updateEstimateTool);
toolRegistry.register(sendEstimateEmailTool);
toolRegistry.register(generateEstimatePdfTool);
toolRegistry.register(changeEstimateStateTool);

export { ToolRegistry } from './registry.js';
export type { McpTool } from './types.js';