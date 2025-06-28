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

### Estimate Management
- `estimate_list` - List estimates with advanced filters (type, status, date range, etc.)
- `estimate_create` - Create new estimates (quotes, proformas, fees notes)
- `estimate_get` - Get detailed information about a specific estimate
- `estimate_update` - Update existing estimates
- `estimate_send_email` - Send estimates by email with customizable message
- `estimate_generate_pdf` - Generate PDF for estimates
- `estimate_change_state` - Change estimate state (finalize, accept, refuse, cancel, delete)

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
│   └── clients/      # Client-related tools
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