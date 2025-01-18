import { Category, CategoryWithBreadcrumb } from "@pcc/shared";

export const getRootCategories = async () => {
  const response = await fetch(
    "http://localhost:5011/api/category/children/root",
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch root categories");
  }

  const data = await response.json();
  return data.data as Category[];
};

export const getChildCategories = async (id: string) => {
  const response = await fetch(
    `http://localhost:5011/api/category/children/${id}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch child categories");
  }

  const data = await response.json();
  return data.data as Category[];
};

export const getParentCategory = async (id: string) => {
  const response = await fetch(
    `http://localhost:5011/api/category/parent/${id}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch parent category");
  }

  const data = await response.json();
  return data.data as Category;
};

export const getCategoryWithBreadcrumbByProduct = async (slug: string) => {
  const response = await fetch(
    `http://localhost:5011/api/category/product/${slug}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category by product");
  }

  const data = await response.json();
  return data.data as CategoryWithBreadcrumb[];
};
