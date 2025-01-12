import { CategoryWithBreadcrumb } from "@pcc/shared";
import { CategoryModel } from "../../models";
import { getCategoryParentFromDB } from "./category";

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

export const getCategoryWithBreadcrumbFromDB = async (
  category: CategoryModel,
) => {
  return {
    ...category.get({ plain: true }),
    breadcrumb: await getCategoryBreadcrumbFromDB(category),
  } as CategoryWithBreadcrumb;
};
