import { RequestHandler } from "express";
import {
  getProductBySlugFromDB,
  getProductsByCategorySlugFromDB,
  ORDER_CRITERIA,
  DEFAULT_ORDER_CRITERIA,
  ORDER_CRITERIA_TYPE,
  getTotalProductsByCategorySlugFromDB,
  getTotalProductsByInheritedCategoriesFromDB,
  getProductsByInheritedCategoriesFromDB,
} from "../services/productService";
import { getCategoryBySlugFromDB } from "../services/categoryService";

export const getProductBySlug: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await getProductBySlugFromDB(slug);

    if (product) {
      res.json({ type: "product", data: product });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

const MAX_PRODUCTS_PER_PAGE = 20;
export const getProductsByCategorySlug: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { slug } = req.params;

    const orderCriteria =
      req.query?.orderCriteria &&
      (req.query?.orderCriteria as string) in ORDER_CRITERIA
        ? (req.query?.orderCriteria as ORDER_CRITERIA_TYPE)
        : DEFAULT_ORDER_CRITERIA;

    let page =
      req.query?.page && !isNaN(Number(req.query?.page))
        ? Math.max(Number(req.query?.page), 1)
        : 1;

    const category = await getCategoryBySlugFromDB(slug);

    if (!category) {
      next();
      return;
    }

    const totalProducts = await getTotalProductsByInheritedCategoriesFromDB(
      category
    );

    const maxPages = Math.ceil(
      (totalProducts || MAX_PRODUCTS_PER_PAGE) / MAX_PRODUCTS_PER_PAGE
    );

    page = Math.min(page, maxPages);

    const products = await getProductsByInheritedCategoriesFromDB(
      category,
      orderCriteria,
      page,
      MAX_PRODUCTS_PER_PAGE
    );

    if (!products) {
      next();
      return;
    }

    res.json({
      type: "products",
      page,
      maxPages,
      orderCriteria,
      availableOrderCriteria: Object.keys(
        ORDER_CRITERIA
      ) as ORDER_CRITERIA_TYPE[],
      totalProducts,
      data: products,
    });
    return;
  } catch (error) {
    next(error);
  }
};
