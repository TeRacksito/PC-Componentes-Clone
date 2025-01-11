import { ErrorRequestHandler } from "express";
import { wrapErrorResponse } from "../controllers/responseWrapper";

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error(`[ERROR]: ${err.message}`);

  const statusCode = err.status || 500;
  const errorResponse = wrapErrorResponse(
    err.message || "Internal Server Error",
    process.env.NODE_ENV === "development" ? err.stack : undefined,
  );

  res.status(statusCode).json(errorResponse);
};
