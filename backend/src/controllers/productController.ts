import { RequestHandler } from "express";
import {
  getProductBySlugFromDB,
  getProductsByCategorySlugFromDB,
  ORDER_CRITERIA,
  DEFAULT_ORDER_CRITERIA,
  ORDER_CRITERIA_TYPE,
  getTotalProductsByCategorySlugFromDB,
} from "../services/productService";

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

const MAX_PRODUCTS_PER_PAGE = 40;
export const getProductsByCategorySlug: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { slug } = req.params;

    const orderCriteria =
      req.params?.orderCriteria in ORDER_CRITERIA
        ? (req.params?.orderCriteria as ORDER_CRITERIA_TYPE)
        : DEFAULT_ORDER_CRITERIA;

    const page =
      req.query?.page && !isNaN(Number(req.query?.page))
        ? Math.min(Number(req.query?.page), 1)
        : 1;

    const products = await getProductsByCategorySlugFromDB(
      slug,
      orderCriteria,
      page,
      MAX_PRODUCTS_PER_PAGE
    );

    if (!products) {
      next();
      return;
    }

    const totalProducts = await getTotalProductsByCategorySlugFromDB(slug);

    res.json({
      type: "products",
      page,
      maxPages: Math.ceil(
        (totalProducts || MAX_PRODUCTS_PER_PAGE) / MAX_PRODUCTS_PER_PAGE
      ),
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
