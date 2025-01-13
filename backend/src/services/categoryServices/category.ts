import { Sequelize } from "sequelize";
import { CategoryModel } from "../../models";

export const getCategoryModelBySlugFromDB = async (slug: string) => {
  return await CategoryModel.findOne({ where: { id: slug } });
};

export const getFeaturedCategoriesFromDB = async (targetLength: number = 6) => {
  return await CategoryModel.findAll({
    limit: targetLength,
    order: Sequelize.literal("rand()"),
    attributes: {
      exclude: [],
    },
  });
};

export const getCategoryParentFromDB = async (category: CategoryModel) => {
  return await CategoryModel.findOne({
    where: {
      id: category.parent_id,
    },
  });
};

export const getCategoryChildrenFromDB = async (category: CategoryModel) => {
  return await CategoryModel.findAll({
    where: {
      parent_id: category.id,
    },
  });
};

export const getRootCategoriesFromDB = async () => {
  return await CategoryModel.findAll({
    where: {
      parent_id: null,
    },
  });
};
