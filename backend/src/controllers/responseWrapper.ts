import {
  ErrorResponse,
  ResponseData,
  SuccessResponse,
} from "../@types/response.types";

export function wrapSuccessResponse(
  type: string,
  data: ResponseData,
  message: string | null = null,
) {
  return { type, data, message } as SuccessResponse;
}

export function wrapErrorResponse(
  message: string,
  stack: string | null = null,
): ErrorResponse {
  return { message, stack };
}
