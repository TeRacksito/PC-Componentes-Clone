import { Router } from "express";
import { searchCategoriesBySimilarName } from "../controllers/categoryController";
import { searchProductsBySimilarName } from "../controllers/productController";

export const searchRoutes = Router();

searchRoutes.get(
  "/:searchTerm",
  searchCategoriesBySimilarName,
  searchProductsBySimilarName,
);
