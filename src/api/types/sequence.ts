export interface Sequence {
  id: number;
  serie: string;
  default_sequence: number;
  current_invoice_number?: number;
  current_invoice_receipt_number?: number;
  current_simplified_invoice_number?: number;
  current_credit_note_number?: number;
  current_debit_note_number?: number;
  current_receipt_number?: number;
  current_shipping_number?: number;
  current_transport_number?: number;
  current_devolution_number?: number;
  current_proforma_number?: number;
  current_quote_number?: number;
  current_fees_note_number?: number;
  current_vat_moss_invoice_number?: number;
  current_vat_moss_credit_note_number?: number;
  current_vat_moss_receipt_number?: number;
  invoice_sequence_validation_code?: string;
  invoice_receipt_sequence_validation_code?: string;
  simplified_invoice_sequence_validation_code?: string;
  credit_note_sequence_validation_code?: string;
  debit_note_sequence_validation_code?: string;
  receipt_sequence_validation_code?: string;
  shipping_sequence_validation_code?: string;
  transport_sequence_validation_code?: string;
  devolution_sequence_validation_code?: string;
  proforma_sequence_validation_code?: string;
  quote_sequence_validation_code?: string;
  fees_note_sequence_validation_code?: string;
  vat_moss_invoice_sequence_validation_code?: string;
  vat_moss_credit_note_sequence_validation_code?: string;
  vat_moss_receipt_sequence_validation_code?: string;
  atcud_invoice_serie?: string;
  atcud_invoice_receipt_serie?: string;
  atcud_simplified_invoice_serie?: string;
  atcud_credit_note_serie?: string;
  atcud_debit_note_serie?: string;
  atcud_receipt_serie?: string;
  atcud_shipping_serie?: string;
  atcud_transport_serie?: string;
  atcud_devolution_serie?: string;
  atcud_vat_moss_invoice_serie?: string;
  atcud_vat_moss_credit_note_serie?: string;
  atcud_vat_moss_receipt_serie?: string;
}

export interface SequenceListParams {
  // No specific parameters for listing sequences
}

export interface CreateSequenceRequest {
  serie: string;
  default_sequence?: string;
}

export interface SequenceValidationCode {
  code: string;
  description?: string;
  registeredWithAT?: boolean;
}