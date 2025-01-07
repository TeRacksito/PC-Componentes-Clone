import { Sequelize } from "sequelize";
import { Category } from "../models";

export const getCategoryBySlugFromDB = async (slug: string) => {
  console.log(Category.getAttributes());
  return await Category.findOne({ where: { id: slug } });
};

export const getFeaturedCategoriesFromDB = async (targetLength: number = 6) => {
  return await Category.findAll({
    limit: targetLength,
    order: Sequelize.literal("rand()"),
    attributes: {
      exclude: [],
    },
  });
};

interface LocalizedCategory {
  id: string;
  name: string;
  parent_id: string;
  breadcrumb: LocalizedCategory[];
}
export const getCategoryBreadcrumbFromDB = async (category: Category) => {
  const breadcrumb: LocalizedCategory[] = [];
  while (true) {
    const parent = await getCategoryParentFromDB(category);

    if (!parent) {
      break;
    }
    breadcrumb.push({
      id: parent.id,
      name: parent.name,
      parent_id: parent.parent_id,
      breadcrumb: await getCategoryBreadcrumbFromDB(parent),
    });
    category = parent;
  }
  return breadcrumb.reverse();
};

export const getCategoryParentFromDB = async (category: Category) => {
  return await Category.findOne({
    where: {
      id: category.parent_id,
    },
  });
};

export const getCategoryChildrenFromDB = async (category: Category) => {
  return await Category.findAll({
    where: {
      parent_id: category.id,
    },
  });
};

export interface CategoryTree {
  id: string;
  name: string;
  parent_id: string;
  children: CategoryTree[];
}
export const getCategoryTreeFromDB = async (category: Category) => {
  const children = await getCategoryChildrenFromDB(category);
  const childrenWithTree: CategoryTree[] = await Promise.all(
    children.map(async (child) => {
      return {
        ...child.get(),
        children: (await getCategoryTreeFromDB(child)).children,
      };
    })
  );
  return { ...category.get(), children: childrenWithTree } as CategoryTree;
};
