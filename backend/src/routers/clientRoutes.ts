import express from "express";
import {
  authClientByCredentials,
  authClientById,
} from "../controllers/clientController";
import {
  validateAuthCredentials,
  validateAuthToken,
} from "../middlewares/validators/clientValidator";

export const clientRoutes = express.Router();

clientRoutes.get("/", validateAuthToken, authClientById);
clientRoutes.post("/auth", validateAuthCredentials, authClientByCredentials);
