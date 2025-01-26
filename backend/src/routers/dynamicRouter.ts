import express from "express";
import { homeRouter } from "./homeRoutes";
import { productRoutes } from "./productRoutes";
import { categoryRoutes } from "./categoryRoutes";

export const dynamicRouter = express.Router();

dynamicRouter.use(homeRouter);

dynamicRouter.use(productRoutes);
dynamicRouter.use(categoryRoutes);

dynamicRouter.use((_, res) => {
  res.status(404).json({ message: "Resource not found" });
  return;
});
