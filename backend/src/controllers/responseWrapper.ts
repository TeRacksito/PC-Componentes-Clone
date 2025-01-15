import { ErrorResponse, ResponseData, SuccessResponse } from "@pcc/shared";

export function wrapSuccessResponse(
  type: string,
  data: ResponseData,
  message?: string,
) {
  return { type, data, message } as SuccessResponse;
}

export function wrapErrorResponse(message: string, stack?: string) {
  return { type: "error", message, stack } as ErrorResponse;
}
