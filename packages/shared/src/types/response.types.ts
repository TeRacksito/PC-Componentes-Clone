export type ResponseData = {};

export type SuccessResponse<T = any> = {
  type: string;
  data: T;
  message?: string;
};

export type ErrorResponse = {
  type: "error";
  message: string;
  stack?: string;
};
