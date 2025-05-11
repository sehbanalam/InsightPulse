export interface ApiSuccessResponse<T = any> {
  status: number;
  success: true;
  message: string;
  data: T;
}
