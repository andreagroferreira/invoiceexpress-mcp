# InvoiceExpress MCP - Complete Portuguese Invoice Management for AI

[![Website](https://img.shields.io/badge/Website-wizardingcode.io-blue)](https://wizardingcode.io) [![NPM Version](https://img.shields.io/npm/v/@wizardingcode/invoiceexpress-mcp)](https://www.npmjs.com/package/@wizardingcode/invoiceexpress-mcp) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![smithery badge](https://smithery.ai/badge/@wizardingcode/invoiceexpress-mcp)](https://smithery.ai/server/@wizardingcode/invoiceexpress-mcp) [<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-Install%20InvoiceExpress%20MCP-0098FF">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22invoiceexpress%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40wizardingcode%2Finvoiceexpress-mcp%40latest%22%5D%7D)

[![Português](https://img.shields.io/badge/docs-Português-green)](./README.pt.md)

## ❌ Without InvoiceExpress MCP

Managing Portuguese invoices with AI becomes frustrating and error-prone:

- ❌ Manual invoice creation with outdated API examples
- ❌ No SAF-T compliance automation for Portuguese tax reporting
- ❌ Missing Portuguese tax calculations and validations
- ❌ No integration with Autoridade Tributária (AT) systems
- ❌ Complex treasury and client balance management

## ✅ With InvoiceExpress MCP

InvoiceExpress MCP provides complete Portuguese invoice management with 60+ specialized tools:

Add `Create an invoice for client "Tech Solutions" with Portuguese tax compliance` to your prompt in Cursor:

```txt
Create an invoice for client "Tech Solutions Ltd" with VAT 23% and generate SAF-T for tax authority submission
```

```txt
Export monthly SAF-T file for January 2024 and update client payment status
```

InvoiceExpress MCP delivers:

- ✅ **60+ Specialized Tools**: Complete invoice, client, and treasury management
- ✅ **Portuguese Tax Compliance**: Automatic SAF-T generation, AT integration
- ✅ **Multi-Document Support**: Invoices, estimates, guides, treasury movements
- ✅ **Enterprise-Grade**: TypeScript, error handling, clean architecture
- ✅ **Portuguese Date Formats**: Automatic DD/MM/YYYY conversion

## 🚀 Complete Feature Set

### 📧 Invoice Management (11 tools)
- Create, update, and manage invoices with Portuguese tax compliance
- Generate PDFs, QR codes, and email delivery
- Handle payments, refunds, and document states
- Support for all Portuguese invoice types (simplified, receipts, credit notes)

### 👥 Client Management (7 tools)
- Complete client database with Portuguese fiscal information
- Search by name, code, or tax ID
- Track client invoices and payment history
- Address and contact management

### 📋 Estimates & Quotes (7 tools)
- Professional quotes, proformas, and fee notes
- Convert estimates to invoices seamlessly
- PDF generation and email delivery
- State management workflow

### 🚚 Transport & Shipping (8 tools)
- Shipping guides, transport documents, devolution notes
- QR code generation for tracking
- Integration with Portuguese logistics requirements
- Document workflow automation

### 📦 Product Catalog (5 tools)
- Complete product and service management
- Tax rate assignment and pricing
- Inventory tracking integration
- Portuguese tax code support

### 🔢 Document Sequences (5 tools)
- Portuguese legal document numbering
- Autoridade Tributária (AT) registration
- Validation code management
- Compliance with Portuguese legislation

### 💰 Tax Management (5 tools)
- Portuguese VAT rates (IVA 6%, 13%, 23%)
- Regional tax support (Açores, Madeira)
- Custom tax configuration
- Automatic tax calculations

### 🏢 Account Management (5 tools)
- Multi-account support for agencies
- AT communication configuration
- User management and permissions
- Account creation for existing users

### 📊 SAF-T Compliance (1 tool)
- Monthly SAF-T file generation for Portuguese tax authority
- Automatic submission deadlines (5th of each month)
- XML format compliance with AT requirements
- Audit trail maintenance

### 💳 Treasury Operations (7 tools)
- Client balance management and tracking
- Payment and reimbursement recording
- Financial regularizations
- Treasury movement history

## 🛠️ Installation

### Requirements

- Node.js >= v18.0.0
- InvoiceExpress account with API access
- Cursor, Claude Desktop, VS Code, or another MCP Client

<details>
<summary><b>Installing via Smithery</b></summary>

To install InvoiceExpress MCP Server for any client automatically via [Smithery](https://smithery.ai/server/@wizardingcode/invoiceexpress-mcp):

```bash
npx -y @smithery/cli@latest install @wizardingcode/invoiceexpress-mcp --client <CLIENT_NAME> --key <YOUR_SMITHERY_KEY>
```

You can find your Smithery key in the [Smithery.ai webpage](https://smithery.ai/server/@wizardingcode/invoiceexpress-mcp).

</details>

<details>
<summary><b>Install in Cursor</b></summary>

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. You may also install in a specific project by creating `.cursor/mcp.json` in your project folder. See [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for more info.

> Since Cursor 1.0, you can click the install button below for instant one-click installation.

#### Cursor Local Server Connection

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=invoiceexpress&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkB3aXphcmRpbmdjb2RlL2ludm9pY2VleHByZXNzLW1jcEBsYXRlc3QiXSwiZW52Ijp7IklOVk9JQ0VfRVhQUkVTU19BUElfS0VZIjoieW91ci1hcGkta2V5IiwiSU5WT0lDRV9FWFBSRVNTX0FDQ09VTlRfTkFNRSI6InlvdXItYWNjb3VudC1uYW1lIn19)

```json
{
  "mcpServers": {
    "invoiceexpress": {
      "command": "npx",
      "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"],
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

<details>
<summary>Alternative: Use Bun</summary>

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=invoiceexpress&config=eyJjb21tYW5kIjoiYnVueCIsImFyZ3MiOlsiLXkiLCJAd2l6YXJkaW5nY29kZS9pbnZvaWNlZXhwcmVzcy1tY3BAbGF0ZXN0Il0sImVudiI6eyJJTlZPSUNFX0VYUFJFU1NfQVBJX0tFWSI6InlvdXItYXBpLWtleSIsIklOVk9JQ0VfRVhQUkVTU19BQ0NPVU5UX05BTUUiOiJ5b3VyLWFjY291bnQtbmFtZSJ9fQ%3D%3D)

```json
{
  "mcpServers": {
    "invoiceexpress": {
      "command": "bunx",
      "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"],
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

</details>

<details>
<summary>Alternative: Use Deno</summary>

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=invoiceexpress&config=eyJjb21tYW5kIjoiZGVubyIsImFyZ3MiOlsicnVuIiwiLS1hbGxvdy1lbnY9SU5WT0lDRV9FWFBSRVNTX0FQSV9LRVksSU5WT0lDRV9FWFBSRVNTX0FDQ09VTlRfTkFNRSxOT19ERVBSRUNBVElPTixUUkFDRV9ERVBSRUNBVElPTiIsIi0tYWxsb3ctbmV0IiwibnBtOkB3aXphcmRpbmdjb2RlL2ludm9pY2VleHByZXNzLW1jcCJdLCJlbnYiOnsiSU5WT0lDRV9FWFBSRVNTX0FQSV9LRVkiOiJ5b3VyLWFwaS1rZXkiLCJJTlZPSUNFX0VYUFJFU1NfQUNDT1VOVF9OQU1FIjoieW91ci1hY2NvdW50LW5hbWUifX0%3D)

```json
{
  "mcpServers": {
    "invoiceexpress": {
      "command": "deno",
      "args": ["run", "--allow-env=INVOICEEXPRESS_API_KEY,INVOICEEXPRESS_ACCOUNT_NAME,NO_DEPRECATION,TRACE_DEPRECATION", "--allow-net", "npm:@wizardingcode/invoiceexpress-mcp"],
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

</details>

</details>

<details>
<summary><b>Install in VS Code</b></summary>

[<img alt="Install in VS Code (npx)" src="https://img.shields.io/badge/VS_Code-Install%20InvoiceExpress%20MCP-0098FF">](https://insiders.vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%7B%22name%22%3A%22invoiceexpress%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40wizardingcode%2Finvoiceexpress-mcp%40latest%22%5D%7D)
[<img alt="Install in VS Code Insiders (npx)" src="https://img.shields.io/badge/VS_Code_Insiders-Install%20InvoiceExpress%20MCP-24bfa5">](https://insiders.vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%7B%22name%22%3A%22invoiceexpress%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40wizardingcode%2Finvoiceexpress-mcp%40latest%22%5D%7D)

Add this to your VS Code MCP config file. See [VS Code MCP docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) for more info.

#### VS Code Local Server Connection

```json
"mcp": {
  "servers": {
    "invoiceexpress": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"],
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Claude Desktop</b></summary>

Add this to your Claude Desktop `claude_desktop_config.json` file. See [Claude Desktop MCP docs](https://modelcontextprotocol.io/quickstart/user) for more info.

```json
{
  "mcpServers": {
    "InvoiceExpress": {
      "command": "npx",
      "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"],
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Windsurf</b></summary>

Add this to your Windsurf MCP config file. See [Windsurf MCP docs](https://docs.windsurf.com/windsurf/mcp) for more info.

#### Windsurf Local Server Connection

```json
{
  "mcpServers": {
    "invoiceexpress": {
      "command": "npx",
      "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"],
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Zed</b></summary>

Add this to your Zed `settings.json`. See [Zed Context Server docs](https://zed.dev/docs/assistant/context-servers) for more info.

```json
{
  "context_servers": {
    "InvoiceExpress": {
      "command": {
        "path": "npx",
        "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"]
      },
      "settings": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

</details>

<details>
<summary>
<b>Install in Cline</b>
</summary>

You can easily install InvoiceExpress MCP through the [Cline MCP Server Marketplace](https://cline.bot/mcp-marketplace) or manually:

```json
{
  "mcpServers": {
    "invoiceexpress": {
      "command": "npx",
      "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"],
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in BoltAI</b></summary>

Open the "Settings" page of the app, navigate to "Plugins," and enter the following JSON:

```json
{
  "mcpServers": {
    "invoiceexpress": {
      "command": "npx",
      "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"],
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

More information is available on [BoltAI's Documentation site](https://docs.boltai.com/docs/plugins/mcp-servers).

</details>

<details>
<summary><b>Using Docker</b></summary>

If you prefer to run the MCP server in a Docker container:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install the latest version globally
RUN npm install -g @wizardingcode/invoiceexpress-mcp

# Set environment variables
ENV INVOICEEXPRESS_API_KEY=your-api-key
ENV INVOICEEXPRESS_ACCOUNT_NAME=your-account-name

# Default command to run the server
CMD ["invoiceexpress-mcp"]
```

Build and configure:

```bash
docker build -t invoiceexpress-mcp .
```

</details>

<details>
<summary><b>Install in Windows</b></summary>

The configuration on Windows is slightly different compared to Linux or macOS:

```json
{
  "mcpServers": {
    "invoiceexpress": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@wizardingcode/invoiceexpress-mcp@latest"],
      "disabled": false,
      "env": {
        "INVOICEEXPRESS_API_KEY": "your-api-key",
        "INVOICEEXPRESS_ACCOUNT_NAME": "your-account-name"
      }
    }
  }
}
```

</details>

## 🔧 Configuration

### Required Environment Variables

```bash
INVOICEEXPRESS_API_KEY=your-api-key-here
INVOICEEXPRESS_ACCOUNT_NAME=your-account-name
```

### Optional Environment Variables

```bash
MCP_MODE=silent  # Reduces logging output for production
```

### Getting Your InvoiceExpress Credentials

1. Log in to your InvoiceExpress account
2. Go to **Settings** > **API Access**
3. Generate or copy your API key
4. Note your account name (subdomain in your InvoiceExpress URL)

## 🔨 Available Tools (60+)

InvoiceExpress MCP provides 60+ specialized tools organized by feature area:

### 📧 Invoice Management (11 tools)

- `invoice_list` - List invoices with advanced filtering (status, date, client, amount)
- `invoice_create` - Create invoices with Portuguese tax compliance
- `invoice_get` - Get detailed invoice information
- `invoice_update` - Update existing invoices
- `invoice_send_email` - Send invoices via email with customizable messages
- `invoice_generate_pdf` - Generate PDF documents
- `invoice_change_state` - Change invoice states (draft, sent, final, canceled)
- `invoice_get_related_documents` - Get related documents (credit notes, receipts)
- `invoice_generate_payment` - Generate payment references (MB, CC, PayPal)
- `invoice_cancel_payment` - Cancel payment references
- `invoice_get_qrcode` - Generate QR codes for digital payments

### 👥 Client Management (7 tools)

- `client_list` - List all clients with pagination and filtering
- `client_create` - Create new clients with Portuguese fiscal information
- `client_get` - Get detailed client information
- `client_update` - Update client information and settings
- `client_find_by_name` - Search clients by name or partial match
- `client_find_by_code` - Find clients by unique code
- `client_list_invoices` - List all invoices for a specific client

### 📋 Estimates & Quotes (7 tools)

- `estimate_list` - List estimates, quotes, proformas, and fee notes
- `estimate_create` - Create professional estimates and quotes
- `estimate_get` - Get detailed estimate information
- `estimate_update` - Update existing estimates
- `estimate_send_email` - Send estimates via email
- `estimate_generate_pdf` - Generate PDF documents
- `estimate_change_state` - Manage estimate workflow states

### 🚚 Guides & Transport (8 tools)

- `guide_list` - List shipping guides, transport documents, devolution notes
- `guide_create` - Create shipping and transport documentation
- `guide_get` - Get detailed guide information
- `guide_update` - Update transport documentation
- `guide_send_email` - Send guides via email
- `guide_generate_pdf` - Generate PDF transport documents
- `guide_change_state` - Manage guide workflow states
- `guide_get_qrcode` - Generate QR codes for tracking

### 📦 Product Catalog (5 tools)

- `item_list` - List products and services with filtering
- `item_create` - Create new products/services with tax information
- `item_get` - Get detailed item information
- `item_update` - Update product/service information
- `item_delete` - Remove items from catalog

### 🔢 Document Sequences (5 tools)

- `sequence_list` - List all document numbering sequences
- `sequence_get` - Get detailed sequence information
- `sequence_create` - Create new document sequences
- `sequence_set_as_current` - Set default document sequence
- `sequence_register` - Register sequences with Portuguese Tax Authority (AT)

### 💰 Tax Management (5 tools)

- `tax_list` - List all configured tax rates
- `tax_create` - Create new tax rates (IVA, regional taxes)
- `tax_get` - Get detailed tax information
- `tax_update` - Update tax rate configurations
- `tax_delete` - Remove unused tax rates

### 🏢 Account Management (5 tools)

- `account_get` - Get account information and settings
- `account_create` - Create new InvoiceExpress accounts
- `account_update` - Update account settings and information
- `account_create_for_existing_user` - Create additional accounts for existing users
- `account_update_at_communication` - Configure Tax Authority (AT) communication

### 📊 SAF-T Tax Compliance (1 tool)

- `saft_export` - Export monthly SAF-T files for Portuguese tax authority submission

### 💳 Treasury Operations (7 tools)

- `treasury_get_client_balance` - Get client financial balance and status
- `treasury_update_client_initial_balance` - Set or update client initial balances
- `treasury_get_regularizations` - List financial regularizations
- `treasury_create_regularization` - Create balance regularizations
- `treasury_delete_regularization` - Remove regularizations
- `treasury_create_movement` - Record payments and reimbursements
- `treasury_delete_movement` - Remove treasury movements

## 💡 Usage Examples

### Creating a Complete Invoice

```
Create an invoice for client "Tech Solutions Ltd" with the following:
- Service: Web Development (40 hours × €75/hour)
- Product: Hosting Setup (1 × €200)
- Apply IVA 23% to all items
- Due date: 30 days from today
- Generate PDF and send by email
```

### Portuguese Tax Compliance

```
Generate SAF-T file for January 2024 for tax authority submission.
The file must be ready by February 5th deadline.
```

### Client Balance Management

```
Update client "ABC Company" initial balance to €1,500 dated January 1st, 2024.
Create a payment record of €500 received via Multibanco on March 15th.
```

### Document Workflow

```
Create a quote for "New Project Proposal" for client XYZ Corp.
Convert the accepted quote to an invoice.
Generate shipping guide for product delivery.
```

## 🇵🇹 Portuguese Tax Features

### SAF-T Compliance
- Automatic monthly SAF-T file generation
- Portuguese Tax Authority (AT) format compliance
- Submission deadline reminders (5th of each month)
- Complete audit trail maintenance

### Portuguese Date Formats
- Automatic conversion between ISO (YYYY-MM-DD) and Portuguese (DD/MM/YYYY) formats
- Compliance with Portuguese business standards
- Proper date validation and formatting

### Tax Authority Integration
- AT communication configuration
- Document sequence registration
- Validation code management
- Compliance with Portuguese legislation

### Portuguese VAT Support
- Standard rates: IVA 6%, 13%, 23%
- Regional rates for Açores and Madeira
- Automatic tax calculations
- Tax exemption handling

## 🚨 Troubleshooting

<details>
<summary><b>API Key Issues</b></summary>

If you encounter authentication errors:

1. Verify your API key in InvoiceExpress settings
2. Ensure your account name matches your subdomain
3. Check that your account has API access enabled

```bash
# Test your credentials
INVOICEEXPRESS_API_KEY=your-key INVOICEEXPRESS_ACCOUNT_NAME=your-account invoiceexpress-mcp --help
```

</details>

<details>
<summary><b>Module Not Found Errors</b></summary>

If you encounter `ERR_MODULE_NOT_FOUND`, try using `bunx` instead of `npx`:

```json
{
  "mcpServers": {
    "invoiceexpress": {
      "command": "bunx",
      "args": ["-y", "@wizardingcode/invoiceexpress-mcp@latest"]
    }
  }
}
```

</details>

<details>
<summary><b>Portuguese Date Format Issues</b></summary>

The server automatically handles date conversions. If you encounter date-related errors:

1. Ensure dates are in ISO format (YYYY-MM-DD) in requests
2. The server converts to Portuguese format (DD/MM/YYYY) for InvoiceExpress API
3. Check that dates are valid and within reasonable ranges

</details>

<details>
<summary><b>SAF-T Export Problems</b></summary>

SAF-T file generation may take time:

1. Check if the export is still processing (202 status)
2. Retry after a few minutes for large datasets
3. Ensure your account has SAF-T export permissions
4. Verify the month/year parameters are valid

</details>

## 💻 Development

Clone the project and install dependencies:

```bash
git clone https://github.com/andreagroferreira/invoiceexpress-mcp.git
cd invoiceexpress-mcp
npm install
```

Build:

```bash
npm run build
```

Run the server:

```bash
npm start
```

### CLI Arguments

`invoiceexpress-mcp` accepts the following CLI flags:

- `--transport <stdio|http|sse>` – Transport to use (`stdio` by default)
- `--port <number>` – Port to listen on when using `http` or `sse` transport (default `3000`)
- `--help, -h` – Show help message

Example with help:

```bash
invoiceexpress-mcp --help
```

<details>
<summary><b>Testing with MCP Inspector</b></summary>

```bash
npx -y @modelcontextprotocol/inspector npx @wizardingcode/invoiceexpress-mcp
```

</details>

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 About WizardingCode.io

InvoiceExpress MCP is developed and maintained by [WizardingCode.io](https://wizardingcode.io), specializing in AI-powered business automation solutions for Portuguese companies.

### Connect with Us

- 🌐 Website: [wizardingcode.io](https://wizardingcode.io)
- 📧 Email: [andreagroferreira.af@gmail.com](mailto:andreagroferreira.af@gmail.com)
- 💼 LinkedIn: [WizardingCode](https://linkedin.com/company/wizardingcode)

### Support

For technical support, feature requests, or business inquiries:

1. 🐛 Report issues on [GitHub](https://github.com/andreagroferreira/invoiceexpress-mcp/issues)
2. 📧 Email us at [andreagroferreira.af@gmail.com](mailto:andreagroferreira.af@gmail.com)
3. 💬 Professional support available for enterprise customers

---

**Built with ❤️ in Portugal for Portuguese businesses using AI**