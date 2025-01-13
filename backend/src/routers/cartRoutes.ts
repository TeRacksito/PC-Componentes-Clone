import { Router } from "express";
import { validateAuthToken } from "../middlewares/validators/clientValidator";
import { addToCart, getCart } from "../controllers/cartController";

export const cartRoutes = Router();

cartRoutes.get("/", validateAuthToken, getCart);
cartRoutes.post("/", validateAuthToken, addToCart);
