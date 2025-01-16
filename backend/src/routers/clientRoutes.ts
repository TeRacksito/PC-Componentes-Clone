import express from "express";
import {
  authClientByCredentials,
  authClientById,
  logoutClient,
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
clientRoutes.post("/logout", validateAuthTokenForce, logoutClient);
clientRoutes.post("/", validateSignUpCredentials, signInClient);
