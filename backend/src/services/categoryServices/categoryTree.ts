import { Category, CategoryTree } from "@pcc/shared";
import { getCategoryChildrenFromDB } from "./category";

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
  return {
    ...category,
    children: childrenWithTree,
  } as CategoryTree;
};
