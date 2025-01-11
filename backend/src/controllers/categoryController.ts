import { RequestHandler } from "express";
import { getCategoryModelBySlugFromDB } from "../services/categoryServices/category";
import { wrapSuccessResponse } from "./responseWrapper";
import { getCategoryWithBreadcrumbFromDB } from "../services/categoryServices/categoryWithBreadcrumb";

export const getCategoryBySlug: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await getCategoryModelBySlugFromDB(slug);

    if (!category) {
      next();
      return;
    }

    res.json(
      wrapSuccessResponse(
        "category",
        await getCategoryWithBreadcrumbFromDB(category),
      ),
    );
    return;
  } catch (error) {
    next(error);
  }
};
