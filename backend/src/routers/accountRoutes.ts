import { Router } from "express";
import { authClientById } from "../controllers/clientController";
import { validateAuthTokenForce } from "../middlewares/validators/clientValidator";

export const accountRoutes = Router();
accountRoutes.get("/", validateAuthTokenForce, authClientById);
