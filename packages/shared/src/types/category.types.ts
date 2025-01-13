export type Category = {
  id: string;
  name: string;
  parent_id: string | null;
};

export type CategoryWithBreadcrumb = Category & {
  breadcrumb: CategoryWithBreadcrumb[];
};

export type CategoryTree = Category & {
  children: CategoryTree[];
};
