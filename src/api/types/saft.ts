export interface SAFTExportParams {
  month: string;
  year: string;
}

export interface SAFTExportResponse {
  url?: string;
  message?: string;
  status?: string;
}

export interface SAFTExportRequest {
  month: string;
  year: string;
}