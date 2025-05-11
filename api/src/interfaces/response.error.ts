export interface ApiErrorResponse {
  status: number;
  success: false;
  message: string;
  errors?: any; // optional field for validation or detailed error info
}
