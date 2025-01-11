import { CategoryTree } from "@pcc/shared";
import { Op, Order, Sequelize } from "sequelize";
import {
  CategoryModel,
  FlagModel,
  ProductCategoryModel,
  ProductModel,
} from "../../models";
import { getCategoryModelBySlugFromDB } from "../categoryServices/category";
import { getCategoryTreeFromDB } from "../categoryServices/categoryTree";

export const getProductModelBySlugFromDB = async (slug: string) => {
  return await ProductModel.findOne({ where: { id: slug } });
};

export const ORDER_CRITERIA = {
  offer: [["discount", "DESC"]] as Order,
  priceDesc: [["price", "DESC"]] as Order,
  priceAsc: [["price", "ASC"]] as Order,
};
export type ORDER_CRITERIA_TYPE = keyof typeof ORDER_CRITERIA;
export const DEFAULT_ORDER_CRITERIA: ORDER_CRITERIA_TYPE = "offer";

export const getProductsByCategorySlugFromDB = async (
  slug: string,
  orderCriteria: ORDER_CRITERIA_TYPE = DEFAULT_ORDER_CRITERIA,
  page: number = 1,
  limit: number = 40,
) => {
  if (!ORDER_CRITERIA[orderCriteria]) {
    orderCriteria = DEFAULT_ORDER_CRITERIA;
  }

  const category = await getCategoryModelBySlugFromDB(slug);

  if (!category) {
    return [];
  }

  return await ProductModel.findAll({
    limit: limit,
    offset: (page - 1) * limit,
    order: ORDER_CRITERIA[orderCriteria],
    include: [
      {
        model: CategoryModel,
        attributes: [],
        where: {
          id: category.id,
        },
      },
    ],
  });
};

export const getTotalProductsByCategorySlugFromDB = async (slug: string) => {
  const category = await getCategoryModelBySlugFromDB(slug);

  if (!category) {
    return 0;
  }

  return await ProductModel.count({
    include: [
      {
        model: CategoryModel,
        where: {
          id: category.id,
        },
      },
    ],
  });
};

export const getFeaturedProductsFromDB = async (targetLength: number = 6) => {
  let filter_categories: string[] = [];
  let chosenProducts: ProductModel[] = [];

  for (let i = 0; i < targetLength; i++) {
    const chosen = await ProductModel.findOne({
      order: Sequelize.literal("rand()"),
      attributes: {
        exclude: [],
      },
      include: [
        {
          model: CategoryModel,
          attributes: [],
          where: {
            id: {
              [Op.notIn]: filter_categories,
            },
          },
        },
        {
          model: FlagModel,
          attributes: [],
          where: {
            id: {
              [Op.in]: ["flag-pcrecommended", "flag-pcchoice", "flag-gift"],
            },
          },
        },
      ],
      where: {
        discount: {
          [Op.ne]: 0,
        },
      },
    });

    if (!chosen) {
      break;
    }

    chosenProducts.push(chosen);

    console.log(chosen);

    const categories = await ProductCategoryModel.findAll({
      where: {
        product_id: chosen.id,
      },
    });

    filter_categories = filter_categories.concat(
      categories.map((category) => category.category_id),
    );
  }

  return chosenProducts;
};

const getAllCategoryIds = (tree: CategoryTree): string[] => {
  let ids = [tree.id];

  for (const child of tree.children) {
    ids = ids.concat(getAllCategoryIds(child));
  }

  return ids;
};

export const getProductsByInheritedCategoriesFromDB = async (
  category: CategoryModel,
  orderCriteria: ORDER_CRITERIA_TYPE = DEFAULT_ORDER_CRITERIA,
  page: number = 1,
  limit: number = 40,
) => {
  if (!ORDER_CRITERIA[orderCriteria]) {
    orderCriteria = DEFAULT_ORDER_CRITERIA;
  }

  const categoryTree = await getCategoryTreeFromDB(category);

  return await ProductModel.findAll({
    limit: limit,
    offset: (page - 1) * limit,
    order: ORDER_CRITERIA[orderCriteria],
    include: [
      {
        model: CategoryModel,
        attributes: [],
        where: {
          id: {
            [Op.in]: getAllCategoryIds(categoryTree),
          },
        },
      },
    ],
  });
};

export const getTotalProductsByInheritedCategoriesFromDB = async (
  category: CategoryModel,
) => {
  const categoryTree = await getCategoryTreeFromDB(category);

  return await ProductModel.count({
    include: [
      {
        model: CategoryModel,
        attributes: [],
        where: {
          id: {
            [Op.in]: getAllCategoryIds(categoryTree),
          },
        },
      },
    ],
  });
};
