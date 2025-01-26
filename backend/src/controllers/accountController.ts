import { RequestHandler } from "express";
import { wrapSuccessResponse } from "./responseWrapper";

export const getAccount: RequestHandler = (_, res, next) => {
  try {
    res.status(200).send(wrapSuccessResponse("account", "Not implemented"));
    return;
  } catch (error) {
    next(error);
  }
};
