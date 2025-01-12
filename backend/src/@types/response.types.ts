export type ResponseData = {};

export type SuccessResponse = {
  type: string;
  data: ResponseData;
  message: string | null;
};

export type ErrorResponse = {
  message: string;
  stack: string | null;
};
