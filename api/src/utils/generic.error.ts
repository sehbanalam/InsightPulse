import { ApiErrorResponse } from "../interfaces/response.error";

export const genericError: ApiErrorResponse = {
  success: false,
  message: "Generic error occurred",
  status: 500,
  errors: {
    server: "Internal server error",
  },
};
