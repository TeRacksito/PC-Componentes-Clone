import { RequestHandler } from "express";
import { getFeaturedProductsFromDB } from "../services/productServices/product";
import { getFeaturedCategoriesFromDB } from "../services/categoryServices/category";
import { wrapSuccessResponse } from "./responseWrapper";
import { LandPageContent } from "@pcc/shared";
import { getProductsWithFlagsByProductsFromDB } from "../services/productServices/productWithFlags";

export const getHome: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.query);

    const requestedProducts =
      req.query?.products && !isNaN(Number(req.query?.products))
        ? Number(req.query?.products)
        : undefined;

    const featuredProducts = await getFeaturedProductsFromDB(requestedProducts);
    if (!featuredProducts) {
      throw new Error("No featured products found");
    }

    const featuredProductsWithFlags =
      await getProductsWithFlagsByProductsFromDB(...featuredProducts);

    if (!featuredProductsWithFlags) {
      throw new Error("No featured products with flags found");
    }

    const requestedCategories =
      req.query?.categories && !isNaN(Number(req.query?.categories))
        ? Number(req.query?.categories)
        : undefined;

    const featuredCategories = await getFeaturedCategoriesFromDB(
      requestedCategories
    );
    if (!featuredCategories) {
      throw new Error("No featured categories found");
    }

    res.status(200).json(
      wrapSuccessResponse("home", {
        featuredProductsWithFlags,
        featuredCategories,
      } as LandPageContent)
    );
  } catch (error) {
    next(error);
  }
};
