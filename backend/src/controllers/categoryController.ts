import { RequestHandler } from "express";
import {
  getCategoryBreadcrumbFromDB,
  getCategoryBySlugFromDB,
} from "../services/categoryService";

export const getCategoryBySlug: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await getCategoryBySlugFromDB(slug);

    if (!category) {
      next();
      return;
    }

    const breadcrumb = await getCategoryBreadcrumbFromDB(category);

    res.json({ type: "category", data: { category, breadcrumb } });
    return;
  } catch (error) {
    next(error);
  }
};


