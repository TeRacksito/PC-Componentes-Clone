import express from "express";
import { getProductBySlug } from "../controllers/productController";

export const productRoutes = express.Router();

productRoutes.get("/:slug", getProductBySlug);
