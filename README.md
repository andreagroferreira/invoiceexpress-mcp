# MCP Invoice Express

Production-grade MCP (Model Context Protocol) server for InvoiceExpress API integration. This server enables AI assistants like Claude Desktop, OpenAI, and ChatGPT to interact with InvoiceExpress functionality through standardized MCP tools.

## Features

- 🚀 **Production-ready**: Built with TypeScript, full type safety, and enterprise-grade error handling
- 🔧 **MCP Tools**: Complete set of tools for invoice and client management
- 🔐 **Secure**: API key authentication with environment variable management
- 📊 **Rate Limiting**: Built-in rate limiting to respect API quotas
- 🪝 **Error Handling**: Comprehensive error handling with detailed error messages
- 📝 **Logging**: Structured logging with Winston
- ✅ **Testing**: Jest setup with >80% coverage target
- 🌐 **Portuguese Format Support**: Automatic date conversion to PT format (dd/mm/yyyy)

## Available Tools

### Invoice Management
- `invoice_list` - List invoices with advanced filters (status, date range, client, text search, etc.)
- `invoice_create` - Create new invoices with items and client details
- `invoice_get` - Get detailed information about a specific invoice
- `invoice_update` - Update existing invoices (date, items, client, etc.)
- `invoice_send_email` - Send invoices by email with customizable message
- `invoice_generate_pdf` - Generate PDF for invoices (with second copy option)
- `invoice_change_state` - Change invoice state (finalize, cancel, delete)
- `invoice_related_documents` - Get all documents related to a specific invoice
- `invoice_generate_payment` - Generate a payment receipt for an invoice
- `invoice_cancel_payment` - Cancel a payment receipt
- `invoice_get_qrcode` - Get QR code for a finalized invoice

### Client Management
- `client_list` - List clients with search filters
- `client_create` - Create new clients
- `client_get` - Get client details by ID or code
- `client_update` - Update existing client information
- `client_find_by_name` - Find client by exact name match
- `client_find_by_code` - Find client by code
- `client_list_invoices` - List all invoices for a specific client

### Estimate Management
- `estimate_list` - List estimates with advanced filters (type, status, date range, etc.)
- `estimate_create` - Create new estimates (quotes, proformas, fees notes)
- `estimate_get` - Get detailed information about a specific estimate
- `estimate_update` - Update existing estimates
- `estimate_send_email` - Send estimates by email with customizable message
- `estimate_generate_pdf` - Generate PDF for estimates
- `estimate_change_state` - Change estimate state (finalize, accept, refuse, cancel, delete)

### Guide Management
- `guide_list` - List guides with required filters (shippings, transports, devolutions)
- `guide_create` - Create new guides with origin/destination addresses
- `guide_get` - Get detailed information about a specific guide
- `guide_update` - Update existing guides
- `guide_send_email` - Send guides by email with customizable message
- `guide_generate_pdf` - Generate PDF for guides
- `guide_change_state` - Change guide state (finalize, cancel, delete)
- `guide_get_qrcode` - Get QR code for finalized guides

### Item Management
- `item_list` - List items/products with pagination
- `item_create` - Create new items with tax information
- `item_get` - Get detailed information about a specific item
- `item_update` - Update existing items
- `item_delete` - Delete items

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-invoice-express.git
cd mcp-invoice-express

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your InvoiceExpress credentials
```

## Configuration

Edit the `.env` file with your InvoiceExpress credentials:

```env
INVOICE_EXPRESS_API_KEY=your_api_key_here
INVOICE_EXPRESS_ACCOUNT_NAME=your_account_name_here
```

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

## Integration with AI Assistants

### Claude Desktop

1. Build the project:
```bash
npm run build
```

2. Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "invoice-express": {
      "command": "node",
      "args": ["/path/to/mcp-invoice-express/dist/index.js"],
      "env": {
        "INVOICE_EXPRESS_API_KEY": "your_api_key",
        "INVOICE_EXPRESS_ACCOUNT_NAME": "your_account_name",
        "MCP_MODE": "true"
      }
    }
  }
}
```

### OpenAI / ChatGPT

For integration with OpenAI/ChatGPT, you'll need to:
1. Deploy the MCP server to a accessible endpoint
2. Configure it as an Action in ChatGPT or use it via OpenAI's function calling

## Usage Examples

### List Invoices
```
Use the invoice_list tool to show me all invoices from this month with status "sent"
```

### Create Invoice
```
Create an invoice for client "ABC Company" with:
- Date: 2024-01-15
- Due date: 2024-02-15
- Item: Consulting services, €1000, quantity 10 hours
```

### Send Invoice by Email
```
Send invoice ID 12345 by email to client@example.com with a custom message
```

### Generate PDF
```
Generate a PDF for invoice 12345
```

### Update Invoice
```
Update invoice 12345 to change the due date to 2024-03-15
```

### Change Invoice State
```
Finalize invoice 12345 so it can't be edited anymore
Cancel invoice 12345 with the reason "Customer requested cancellation"
```

### Get Related Documents
```
Show me all documents related to invoice 12345
```

### Generate Payment
```
Generate a payment receipt for invoice 12345:
- Amount: 500.00
- Date: 2024-01-20
- Payment method: Bank transfer (TB)
```

### Cancel Payment
```
Cancel payment receipt 67890 with reason "Payment reversed by bank"
```

### Get QR Code
```
Get the QR code for invoice 12345
```

### Update Client
```
Update client ID 123 with new email address: newemail@example.com
Update client "ABC Company" with new payment terms: 60 days
```

### Find Client
```
Find client by name "ABC Company Ltd"
Find client by code "CLI001"
```

### List Client Invoices
```
Show me all invoices for client ID 456
List invoices for client "XYZ Corporation" with pagination
```

### List Estimates
```
Show me all quotes from this month with status "sent"
```

### Create Estimate
```
Create a quote for client "XYZ Company" with:
- Date: 2024-01-15
- Due date: 2024-02-15
- Item: Design services, €500, quantity 20 hours
```

### Send Estimate by Email
```
Send quote ID 54321 by email to client@example.com
```

### Change Estimate State
```
Accept quote 54321
Refuse proforma 98765 
Cancel fees note 11111 with reason "Client changed requirements"
```

### List Guides
```
Show me all shipping guides with status "sent" (non-archived)
List transport guides from last week
```

### Create Guide
```
Create a shipping guide:
- Date: 2024-01-20
- Due date: 2024-01-25
- Loaded at: 2024-01-20 10:30
- From: Warehouse A, Lisbon, 1000-001, Portugal
- To: Store B, Porto, 4000-001, Portugal
- Client: ABC Logistics
- Item: Product shipment, 100 units
```

### Send Guide by Email
```
Send shipping guide ID 12345 by email to logistics@example.com
```

### Change Guide State
```
Finalize shipping guide 12345
Cancel transport guide 67890 with reason "Delivery rescheduled"
```

### Get Guide QR Code
```
Get QR code for finalized shipping guide 12345
```

### List Items
```
Show me all items/products in the catalog
List items with pagination (page 2, 20 items per page)
```

### Create Item
```
Create a new item:
- Name: Consulting Hour
- Description: Professional consulting services
- Unit price: 75.00
- Unit: hour
- Tax: IVA23
```

### Update Item
```
Update item ID 789 with new price: 85.00
Update item "Web Development" with new description
```

### Delete Item
```
Delete item ID 456
Remove "Old Service" from the catalog
```

### List Sequences
```
Show me all document sequences
List all sequences in the system
```

### Get Sequence
```
Get details for sequence ID 123
Show me sequence 2024 details
```

### Create Sequence
```
Create a new sequence for series "2024"
Create sequence "2025" and set it as default
```

### Set Sequence as Current
```
Set sequence ID 456 as the current/default sequence
Make sequence 789 the default
```

### Register Sequence
```
Register sequence ID 123 with the Tax Authority
Submit sequence 456 to AT for validation
```

### List Taxes
```
Show me all taxes
List all available tax rates
```

### Get Tax
```
Get details for tax ID 31554
Show me information about IVA23
```

### Create Tax
```
Create a new tax:
- Name: IVA23
- Value: 23.0
- Region: PT
- Code: NOR
- Set as default
```

### Update Tax
```
Update tax ID 31554 with new value: 24.0
Change tax "IVA6" to value 7.0
```

### Delete Tax
```
Delete tax ID 31555
Remove unused tax rate
```

### Get Account
```
Get details for account ID 12345
Show me account information
```

### Create Account
```
Create a new account:
- Organization: Tech Solutions Ltd
- Email: admin@techsolutions.com
- Password: secure_password
- Accept terms: Yes
- Fiscal ID: 508000111
```

### Update Account
```
Update account ID 12345:
- New organization name: Tech Solutions International
- Update email: newemail@techsolutions.com
- Add address and postal code
```

### Create Account for Existing User
```
Create new account for existing user:
- User email: existing@user.com
- User password: their_password
- New organization: Second Company Ltd
- Accept terms: Yes
```

### Update AT Communication
```
Configure Tax Authority communication:
- AT subuser: 123456789/3
- AT password: my_at_password
- Communication type: auto
```

### Export SAF-T
```
Export SAF-T file for January 2024
Export tax file for month 12 year 2023
Generate SAF-T for 03/2024
```

**Note:** SAF-T (Standard Audit File for Tax) is required for Portuguese tax compliance. Files must be submitted by the 5th of each month. The export may take time to process - if you receive a "processing" status, retry after a few minutes.

### Get Client Balance
```
Get balance for client ID 12345
Show me financial balance for client 789
```

### Update Client Initial Balance
```
Set initial balance for client 12345:
- Value: 1500.00
- Date: 2024-01-01
- Observation: Opening balance
```

### Get Regularizations
```
List all regularizations for client 12345
Show me regularization entries for client 789
```

### Create Regularization
```
Create regularization for client 12345:
- Value: 250.00
- Date: 2024-03-15
- Observation: Balance adjustment
```

### Delete Regularization
```
Delete regularization ID 456 for client 12345
Remove regularization entry 789
```

### Create Treasury Movement
```
Record payment from client 12345:
- Value: 500.00
- Type: Payment
- Date: 2024-03-20
- Payment method: MB

Create reimbursement for client 789:
- Value: 100.00
- Type: Reimbursement
- Date: 2024-03-21
```

### Delete Treasury Movement
```
Delete treasury movement ID 123 for client 12345
Remove payment record 456
```

## API Features

### Date Format Support
The server automatically converts dates between ISO format (YYYY-MM-DD) and Portuguese format (DD/MM/YYYY) as required by the InvoiceExpress API.

### Document Types
Supports multiple document types:

**Invoices:**
- Invoices
- Invoice Receipts
- Simplified Invoices
- Credit Notes
- Debit Notes

**Estimates:**
- Quotes
- Proformas
- Fees Notes

**Guides:**
- Shippings
- Transports
- Devolutions

### Advanced Filtering
List operations support comprehensive filtering:
- By status (draft, sent, final, canceled, settled, unsettled)
- By date ranges
- By client
- Text search across invoice details
- By reference number
- By total amount ranges

## Project Structure

```
src/
├── api/              # InvoiceExpress API client
├── server/           # MCP server implementation
├── tools/            # MCP tool definitions
│   ├── invoices/     # Invoice-related tools
│   ├── clients/      # Client-related tools
│   ├── estimates/    # Estimate-related tools
│   ├── guides/       # Guide-related tools
│   ├── items/        # Item-related tools
│   ├── sequences/    # Sequence-related tools
│   ├── taxes/        # Tax-related tools
│   ├── accounts/     # Account-related tools
│   ├── saft/         # SAF-T export tools
│   └── treasury/     # Treasury management tools
├── utils/            # Utilities (logging, validation, errors)
└── types/            # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/yourusername/mcp-invoice-express/issues) page.