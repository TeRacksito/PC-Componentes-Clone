import { Client } from "@pcc/shared";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ClientSignature } from "./clientSignature.types";

declare module "express-serve-static-core" {
  interface Request {
    client?: ClientSignature;
  }
}

declare module "express-session" {
  interface SessionData {
    cart?: { product_id: string; quantity: number }[];
  }
}
