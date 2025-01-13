import { RequestHandler } from "express";
import { HttpError } from "../HttpError";
import { verify } from "jsonwebtoken";
import { ClientSignature } from "../../@types/clientSignature.types";

export const validateAuthCredentials: RequestHandler = (req, _, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || typeof identifier !== "string") {
      throw new HttpError("Email or username is required", 400);
    }

    if (!password || typeof password !== "string") {
      throw new HttpError("Password is required", 400);
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(identifier);

    if (!isEmail && !isUsername) {
      throw new HttpError("Invalid email or username format", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateAuthToken: RequestHandler = async (req, _, next) => {
  try {
    const token = req.cookies.token;
    try {
      const decoded = verify(token, process.env.JWT_SECRET as string);

      req.client = decoded as ClientSignature; 
      next();
    } catch (error) {
      req.client = undefined;   
      next();
    }
  } catch (error: any) {
    next(new HttpError("Invalid token", 401, error));
  }
};

export const validateAuthTokenForce: RequestHandler = async (req, _, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new HttpError("Not authenticated", 401);
    }

    const decoded = verify(token, process.env.JWT_SECRET as string);

    req.client = decoded as ClientSignature;
    next();
  } catch (error: any) {
    next(new HttpError("Invalid token", 401, error));
  }
};
