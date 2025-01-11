import { CategoryTree } from "@pcc/shared";
import { CategoryModel } from "../../models";
import { getCategoryChildrenFromDB } from "./category";

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
