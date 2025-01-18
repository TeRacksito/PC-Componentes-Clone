import { RequestHandler } from "express";
import { wrapSuccessResponse } from "./responseWrapper";
import {
  DEFAULT_ORDER_CRITERIA,
  getProductModelBySlugFromDB,
  getProductsByInheritedCategoriesFromDB,
  getProductsBySimilarNameFromDB,
  getTotalProductsByInheritedCategoriesFromDB,
  ORDER_CRITERIA,
  ORDER_CRITERIA_TYPE,
} from "../services/productServices/product";
import { getCategoryModelBySlugFromDB } from "../services/categoryServices/category";
import { PaginatedProducts } from "@pcc/shared";
import { getProductsWithFlagsByProductsFromDB } from "../services/productServices/productWithFlags";

export const getProductBySlug: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await getProductModelBySlugFromDB(slug);

    if (!product) {
      next();
      return;
    }

    const productWithFlags =
      await getProductsWithFlagsByProductsFromDB(product);

    if (!productWithFlags) {
      next();
      return;
    }

    res.json(wrapSuccessResponse("product", productWithFlags[0]));

    next();
  } catch (error) {
    next(error);
  }
};

const MAX_PRODUCTS_PER_PAGE = 20;
export const getProductsByCategorySlug: RequestHandler = async (
  req,
  res,
  next,
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

    const category = await getCategoryModelBySlugFromDB(slug);

    if (!category) {
      next();
      return;
    }

    const totalProducts =
      await getTotalProductsByInheritedCategoriesFromDB(category);

    const maxPages = Math.ceil(
      (totalProducts || MAX_PRODUCTS_PER_PAGE) / MAX_PRODUCTS_PER_PAGE,
    );

    page = Math.min(page, maxPages);

    const products = await getProductsByInheritedCategoriesFromDB(
      category,
      orderCriteria,
      page,
      MAX_PRODUCTS_PER_PAGE,
    );

    if (!products) {
      next();
      return;
    }

    const productsWithFlags = await getProductsWithFlagsByProductsFromDB(
      ...products,
    );

    if (!productsWithFlags) {
      next();
      return;
    }

    res.json(
      wrapSuccessResponse("products", {
        page,
        maxPages,
        orderCriteria,
        availableOrderCriteria: Object.keys(
          ORDER_CRITERIA,
        ) as ORDER_CRITERIA_TYPE[],
        totalProducts,
        products: productsWithFlags,
      } as PaginatedProducts),
    );

    res.json({
      type: "products",
      page,
      maxPages,
      orderCriteria,
      availableOrderCriteria: Object.keys(
        ORDER_CRITERIA,
      ) as ORDER_CRITERIA_TYPE[],
      totalProducts,
      data: products,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const searchProductsBySimilarName: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { searchTerm } = req.params;

    const products = await getProductsBySimilarNameFromDB(searchTerm);

    if (!products || products.length === 0) {
      next();
      return;
    }

    res.json(wrapSuccessResponse("products", products));
    return;
  } catch (error) {
    next(error);
  }
};
