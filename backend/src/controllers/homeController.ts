import { RequestHandler } from "express";
import { getFeaturedProductsFromDB } from "../services/productService";
import { getFeaturedCategoriesFromDB } from "../services/categoryService";

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

    res.status(200).json({
      type: "home",
      featuredProducts,
      featuredCategories,
    });
  } catch (error) {
    next(error);
  }
};
