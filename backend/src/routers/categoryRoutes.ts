import express from "express";
import { getCategoryBySlug } from "../controllers/categoryController";
import { getProductsByCategorySlug } from "../controllers/productController";

export const categoryRoutes = express.Router();

categoryRoutes.get("/:slug", getCategoryBySlug);
categoryRoutes.get("/:slug/products/:filter?", getProductsByCategorySlug);
