import { RequestHandler } from "express";
import {
  getCategoriesByProductFromDB,
  getCategoriesBySimilarNameFromDB,
  getCategoryChildrenFromDB,
  getCategoryModelBySlugFromDB,
  getCategoryParentFromDB,
  getRootCategoriesFromDB,
} from "../services/categoryServices/category";
import { wrapSuccessResponse } from "./responseWrapper";
import { getCategoryWithBreadcrumbFromDB } from "../services/categoryServices/categoryWithBreadcrumb";
import { getProductModelBySlugFromDB } from "../services/productServices/product";

export const getCategoryBySlug: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await getCategoryModelBySlugFromDB(slug);

    if (!category) {
      next();
      return;
    }

    res.status(200).json(
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

export const getRootCategories: RequestHandler = async (_, res, next) => {
  try {
    res.status(200).json(
      wrapSuccessResponse(
        "categories",
        (await getRootCategoriesFromDB()).map((category) =>
          category.get({ plain: true }),
        ),
      ),
    );
    return;
  } catch (error) {
    next(error);
  }
};

export const getChildCategories: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryModelBySlugFromDB(id);

    if (!category) {
      throw new Error("Category not found");
    }

    res.status(200).json(
      wrapSuccessResponse(
        "categories",
        (await getCategoryChildrenFromDB(category)).map((category) =>
          category.get({ plain: true }),
        ),
      ),
    );
    return;
  } catch (error) {
    next(error);
  }
};

export const getParentCategory: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryModelBySlugFromDB(id);

    if (!category) {
      throw new Error("Category not found");
    }

    const parent = await getCategoryParentFromDB(category);

    if (!parent) {
      throw new Error("Parent category not found");
    }

    res.status(200).json(wrapSuccessResponse("category", parent.get({ plain: true })));
    return;
  } catch (error) {
    next(error);
  }
};

export const searchCategoriesBySimilarName: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { searchTerm } = req.params;

    console.log(searchTerm);

    const categories = await getCategoriesBySimilarNameFromDB(searchTerm);

    if (!categories || categories.length === 0) {
      next();
      return;
    }

    res.status(200).json(wrapSuccessResponse("categories", categories));
    return;
  } catch (error) {
    next(error);
  }
};

export const getCategoriesWithBreadcrumbsByProduct: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { slug } = req.params;
    const product = await getProductModelBySlugFromDB(slug);

    if (!product) {
      next();
      return;
    }

    const categories = await getCategoriesByProductFromDB(product);

    if (!categories || categories.length === 0) {
      next();
      return;
    }

    const categoriesWithBreadcrumbs = await Promise.all(
      categories.map((category) => getCategoryWithBreadcrumbFromDB(category)),
    );

    res.status(200).json(wrapSuccessResponse("categories", categoriesWithBreadcrumbs));
    return;
  } catch (error) {
    next(error);
  }
};
