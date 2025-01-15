import express from "express";
import {
  authClientByCredentials,
  authClientById,
  signInClient,
} from "../controllers/clientController";
import {
  validateAuthCredentials,
  validateAuthTokenForce,
  validateSignUpCredentials,
} from "../middlewares/validators/clientValidator";

export const clientRoutes = express.Router();

clientRoutes.get("/", validateAuthTokenForce, authClientById);
clientRoutes.post("/login", validateAuthCredentials, authClientByCredentials);
clientRoutes.post("/", validateSignUpCredentials, signInClient);