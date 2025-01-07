import { Op, Order, Sequelize } from "sequelize";
import { Category, Product, ProductCategory } from "../models";

export const getProductBySlugFromDB = async (slug: string) => {
  return await Product.findOne({ where: { id: slug } });
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
  limit: number = 40
) => {

  if (!ORDER_CRITERIA[orderCriteria]) {
    orderCriteria = DEFAULT_ORDER_CRITERIA;
  }
  
  const category = await Category.findOne({ where: { id: slug } });

  if (category) {
    return await Product.findAll({
      limit: limit,
      offset: (page - 1) * limit,
      order: ORDER_CRITERIA[orderCriteria],
      include: [
        {
          model: Category,
          where: {
            id: category.id,
          },
        },
      ],
    });
  }
};

export const getTotalProductsByCategorySlugFromDB = async (slug: string) => {
  const category = await Category.findOne({ where: { id: slug } });

  if (category) {
    return await Product.count({
      include: [
        {
          model: Category,
          where: {
            id: category.id,
          },
        },
      ],
    });
  }
}

export const getFeaturedProductsFromDB = async (targetLength: number = 6) => {
  let filter_categories: string[] = [];
  let chosenProducts: Product[] = [];

  for (let i = 0; i < targetLength; i++) {
    const chosen = await Product.findOne({
      order: Sequelize.literal("rand()"),
      attributes: {
        exclude: [],
      },
      include: [
        {
          model: Category,
          attributes: [],
          where: {
            id: {
              [Op.notIn]: filter_categories,
            },
          },
        },
      ],
      where: {
        [Op.or]: [
          {
            flags: {
              [Op.like]: "%flag-pcrecommended%",
            },
          },
          {
            discount: {
              [Op.ne]: 0,
            },
          },
        ],
      },
    });

    if (chosen) {
      chosenProducts.push(chosen);

      const categories = await ProductCategory.findAll({
        where: {
          product_id: chosen.id,
        },
      });

      filter_categories = filter_categories.concat(
        categories.map((category) => category.category_id)
      );
    }
  }

  return chosenProducts;
};
