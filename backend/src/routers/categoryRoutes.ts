import express from "express";
import { getProductBySlug, getProductsByCategorySlug } from "../controllers/productController";
import { getCategoryBySlug } from "../controllers/categoryController";

export const categoryRoutes = express.Router();

categoryRoutes.get("/:slug", getCategoryBySlug);
categoryRoutes.get("/:slug/products/:orderCriteria?", getProductsByCategorySlug);
