import { Category, CategoryWithBreadcrumb } from "@pcc/shared";
import { getCategoryParentFromDB } from "./category";
import { CategoryModel } from "../../models";

export const getCategoryBreadcrumbFromDB = async (category: CategoryModel) => {
  const breadcrumb: CategoryWithBreadcrumb[] = [];
  while (true) {
    const parent = await getCategoryParentFromDB(category);

    if (!parent) {
      break;
    }
    breadcrumb.push(await getCategoryWithBreadcrumbFromDB(parent));
    category = parent;
  }
  return breadcrumb.reverse();
};

export const getCategoryWithBreadcrumbFromDB = async (category: CategoryModel) => {
  return {
    ...category.get(),
    breadcrumb: await getCategoryBreadcrumbFromDB(category),
  } as CategoryWithBreadcrumb;
};
