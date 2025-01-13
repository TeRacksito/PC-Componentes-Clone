import express from "express";
import { getCategoryBySlug, getChildCategories, getParentCategory, getRootCategories } from "../controllers/categoryController";
import { getProductsByCategorySlug } from "../controllers/productController";

export const categoryRoutes = express.Router();

categoryRoutes.get("/category/children/root", getRootCategories);
categoryRoutes.get("/category/children/:id", getChildCategories);
categoryRoutes.get("/category/parent/:id", getParentCategory);
categoryRoutes.get("/:slug", getCategoryBySlug);
categoryRoutes.get("/:slug/products/:filter?", getProductsByCategorySlug);