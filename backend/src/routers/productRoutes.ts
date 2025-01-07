import express from "express";
import { getCategoryBySlug } from "../controllers/categoryController";
import { getProductBySlug } from "../controllers/productController";

export const productRoutes = express.Router();

productRoutes.get("/:slug", getProductBySlug);
