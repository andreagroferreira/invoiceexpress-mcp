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
  getClientTool,
  updateClientTool,
  findClientByNameTool,
  findClientByCodeTool,
  listClientInvoicesTool
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
import {
  listGuidesTool,
  getGuideTool,
  createGuideTool,
  updateGuideTool,
  sendGuideEmailTool,
  generateGuidePdfTool,
  changeGuideStateTool,
  getGuideQrCodeTool,
} from './guides/index.js';
import {
  listItemsTool,
  getItemTool,
  createItemTool,
  updateItemTool,
  deleteItemTool,
} from './items/index.js';
import {
  listSequencesTool,
  getSequenceTool,
  createSequenceTool,
  setSequenceAsCurrentTool,
  registerSequenceTool,
} from './sequences/index.js';
import {
  listTaxesTool,
  getTaxTool,
  createTaxTool,
  updateTaxTool,
  deleteTaxTool,
} from './taxes/index.js';
import {
  getAccountTool,
  createAccountTool,
  updateAccountTool,
  createAccountForExistingUserTool,
  updateATCommunicationTool,
} from './accounts/index.js';
import {
  exportSAFTTool,
} from './saft/index.js';
import {
  getClientBalanceTool,
  updateClientInitialBalanceTool,
  getRegularizationsTool,
  createRegularizationTool,
  deleteRegularizationTool,
  createTreasuryMovementTool,
  deleteTreasuryMovementTool,
} from './treasury/index.js';

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
toolRegistry.register(updateClientTool);
toolRegistry.register(findClientByNameTool);
toolRegistry.register(findClientByCodeTool);
toolRegistry.register(listClientInvoicesTool);

// Register estimate tools
toolRegistry.register(listEstimatesTool);
toolRegistry.register(getEstimateTool);
toolRegistry.register(createEstimateTool);
toolRegistry.register(updateEstimateTool);
toolRegistry.register(sendEstimateEmailTool);
toolRegistry.register(generateEstimatePdfTool);
toolRegistry.register(changeEstimateStateTool);

// Register guide tools
toolRegistry.register(listGuidesTool);
toolRegistry.register(getGuideTool);
toolRegistry.register(createGuideTool);
toolRegistry.register(updateGuideTool);
toolRegistry.register(sendGuideEmailTool);
toolRegistry.register(generateGuidePdfTool);
toolRegistry.register(changeGuideStateTool);
toolRegistry.register(getGuideQrCodeTool);

// Register item tools
toolRegistry.register(listItemsTool);
toolRegistry.register(getItemTool);
toolRegistry.register(createItemTool);
toolRegistry.register(updateItemTool);
toolRegistry.register(deleteItemTool);

// Register sequence tools
toolRegistry.register(listSequencesTool);
toolRegistry.register(getSequenceTool);
toolRegistry.register(createSequenceTool);
toolRegistry.register(setSequenceAsCurrentTool);
toolRegistry.register(registerSequenceTool);

// Register tax tools
toolRegistry.register(listTaxesTool);
toolRegistry.register(getTaxTool);
toolRegistry.register(createTaxTool);
toolRegistry.register(updateTaxTool);
toolRegistry.register(deleteTaxTool);

// Register account tools
toolRegistry.register(getAccountTool);
toolRegistry.register(createAccountTool);
toolRegistry.register(updateAccountTool);
toolRegistry.register(createAccountForExistingUserTool);
toolRegistry.register(updateATCommunicationTool);

// Register SAF-T tools
toolRegistry.register(exportSAFTTool);

// Register treasury tools
toolRegistry.register(getClientBalanceTool);
toolRegistry.register(updateClientInitialBalanceTool);
toolRegistry.register(getRegularizationsTool);
toolRegistry.register(createRegularizationTool);
toolRegistry.register(deleteRegularizationTool);
toolRegistry.register(createTreasuryMovementTool);
toolRegistry.register(deleteTreasuryMovementTool);

export { ToolRegistry } from './registry.js';
export type { McpTool } from './types.js';