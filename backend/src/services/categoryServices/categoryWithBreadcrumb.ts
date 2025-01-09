import {
  Category,
  CategoryWithBreadcrumb,
  extractProperties,
} from "@pcc/shared";
import { getCategoryParentFromDB } from "./category";

export const getCategoryBreadcrumbFromDB = async (category: Category) => {
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

export const getCategoryWithBreadcrumbFromDB = async (category: Category) => {
  return {
    ...extractProperties<Category>(category),
    breadcrumb: await getCategoryBreadcrumbFromDB(category),
  } as CategoryWithBreadcrumb;
};
