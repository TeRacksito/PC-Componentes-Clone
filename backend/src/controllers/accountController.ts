import { RequestHandler } from "express";
import { wrapSuccessResponse } from "./responseWrapper";

export const getAccount: RequestHandler = (req, res, next) => {
  try {
    res.status(200).send(wrapSuccessResponse("account", "Not implemented"));
  } catch (error) {
    next(error);
  }
};
