import express from "express";
import {
  authClientByCredentials,
  authClientById,
} from "../controllers/clientController";
import {
  validateAuthCredentials,
  validateAuthTokenForce,
} from "../middlewares/validators/clientValidator";

export const clientRoutes = express.Router();

clientRoutes.get("/", validateAuthTokenForce, authClientById);
clientRoutes.post("/login", validateAuthCredentials, authClientByCredentials);