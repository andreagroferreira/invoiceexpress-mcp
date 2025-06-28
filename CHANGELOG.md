# Changelog

All notable changes to the InvoiceExpress MCP Server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-28

### Added

#### 🚀 Core Features
- Complete MCP server implementation for InvoiceExpress API integration
- Support for 60+ specialized tools across all InvoiceExpress features
- Enterprise-grade TypeScript architecture with clean code patterns
- Winston logging with MCP_MODE support for silent operation
- Comprehensive error handling with specific error types

#### 📧 Invoice Management (11 tools)
- Create, update, and manage invoices with Portuguese tax compliance
- Generate PDFs, QR codes, and email delivery functionality
- Handle payments, refunds, and document state management
- Support for all Portuguese invoice types (simplified, receipts, credit notes)

#### 👥 Client Management (7 tools)
- Complete client database with Portuguese fiscal information
- Search by name, code, or tax ID functionality
- Track client invoices and payment history
- Address and contact management

#### 📋 Estimates & Quotes (7 tools)
- Professional quotes, proformas, and fee notes creation
- Convert estimates to invoices seamlessly
- PDF generation and email delivery
- State management workflow

#### 🚚 Transport & Shipping (8 tools)
- Shipping guides, transport documents, devolution notes
- QR code generation for tracking
- Integration with Portuguese logistics requirements
- Document workflow automation

#### 📦 Product Catalog (5 tools)
- Complete product and service management
- Tax rate assignment and pricing
- Inventory tracking integration
- Portuguese tax code support

#### 🔢 Document Sequences (5 tools)
- Portuguese legal document numbering
- Autoridade Tributária (AT) registration
- Validation code management
- Compliance with Portuguese legislation

#### 💰 Tax Management (5 tools)
- Portuguese VAT rates (IVA 6%, 13%, 23%)
- Regional tax support (Açores, Madeira)
- Custom tax configuration
- Automatic tax calculations

#### 🏢 Account Management (5 tools)
- Multi-account support for agencies
- AT communication configuration
- User management and permissions
- Account creation for existing users

#### 📊 SAF-T Compliance (1 tool)
- Monthly SAF-T file generation for Portuguese tax authority
- Automatic submission deadlines (5th of each month)
- XML format compliance with AT requirements
- Audit trail maintenance

#### 💳 Treasury Operations (7 tools)
- Client balance management and tracking
- Payment and reimbursement recording
- Financial regularizations
- Treasury movement history

#### 🇵🇹 Portuguese Tax Features
- Automatic date format conversion (ISO ↔ DD/MM/YYYY)
- SAF-T compliance automation
- Portuguese Tax Authority (AT) integration
- Document sequence registration
- Validation code management

#### 🛠️ Development & Integration
- CLI support with transport options (stdio, http, sse)
- Environment variable configuration
- Comprehensive error handling
- Type-safe API client with Zod validation
- Clean architecture with separation of concerns

#### 📦 NPM Package Features
- Global installation support with `npx`
- Binary command: `invoiceexpress-mcp`
- Support for all major MCP clients (Cursor, Claude Desktop, VS Code, etc.)
- Docker container support
- Windows compatibility

#### 📚 Documentation
- Comprehensive README with 15+ installation methods
- Complete tool documentation with examples
- Portuguese tax compliance guidance
- Troubleshooting section for common issues
- WizardingCode.io branding and support information

### Technical Details

#### Dependencies
- `@modelcontextprotocol/sdk`: ^0.5.0 - Core MCP functionality
- `axios`: ^1.6.7 - HTTP client for API requests
- `zod`: ^3.22.4 - Runtime type validation
- `winston`: ^3.11.0 - Structured logging
- `dotenv`: ^16.4.1 - Environment variable management
- `node-cache`: ^5.1.2 - Caching layer
- `p-limit`: ^5.0.0 - Concurrency control

#### Requirements
- Node.js >= 18.0.0
- InvoiceExpress account with API access
- Compatible MCP client (Cursor, Claude Desktop, VS Code, etc.)

### Configuration

#### Required Environment Variables
- `INVOICEEXPRESS_API_KEY`: Your InvoiceExpress API key
- `INVOICEEXPRESS_ACCOUNT_NAME`: Your InvoiceExpress account name

#### Optional Environment Variables
- `MCP_MODE`: Set to 'silent' to reduce logging output

### Installation Methods

Support for installation in 15+ MCP clients:
- Cursor with one-click installation buttons
- Claude Desktop
- VS Code and VS Code Insiders
- Windsurf
- Zed
- Cline with MCP Marketplace support
- BoltAI
- Docker containers
- Windows with cmd wrapper
- Smithery automatic installation
- Global NPM installation

### Security

- No hardcoded credentials or secrets
- Environment variable based configuration
- Secure API key handling
- Input validation with Zod schemas
- Error handling without information leakage

### Performance

- Efficient HTTP client with connection pooling
- Request caching layer
- Concurrency control for bulk operations
- Optimized logging for production use

### Compliance

- Portuguese Tax Authority (AT) integration
- SAF-T (Standard Audit File for Tax) generation
- Document numbering compliance
- Date format standardization (DD/MM/YYYY)
- VAT calculation accuracy

---

**Built with ❤️ in Portugal for Portuguese businesses using AI**