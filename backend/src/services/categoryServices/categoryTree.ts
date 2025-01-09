import { Category, CategoryTree } from "@pcc/shared";
import { getCategoryChildrenFromDB } from "./category";
import { CategoryModel } from "../../models";

export const getCategoryTreeFromDB = async (category: CategoryModel) => {
  const children = await getCategoryChildrenFromDB(category);
  const childrenWithTree: CategoryTree[] = await Promise.all(
    children.map(async (child) => {
      return {
        ...child.get(),
        children: (await getCategoryTreeFromDB(child)).children,
      };
    })
  );
  return {
    ...category.get(),
    children: childrenWithTree,
  } as CategoryTree;
};
