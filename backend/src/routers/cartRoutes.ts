import { Router } from "express";
import { validateAuthToken } from "../middlewares/validators/clientValidator";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../controllers/cartController";

export const cartRoutes = Router();

cartRoutes.get("/", validateAuthToken, getCart);
cartRoutes.post("/:product_id", validateAuthToken, addToCart);
cartRoutes.put("/:product_id", validateAuthToken, updateCartItemQuantity);
cartRoutes.delete("/:product_id", validateAuthToken, removeFromCart);
