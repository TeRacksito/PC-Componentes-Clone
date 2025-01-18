import { Category, Product } from "@pcc/shared";

export const searchByName = async (slug: string) => {
  const response = await fetch(`http://localhost:5011/api/search/${slug}`, {
    method: "GET",
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  if (data.type == "products") {
    return data.data as Product[];
  } else if (data.type == "categories") {
    return data.data as Category[];
  } else {
    throw new Error("Invalid response type");
  }
};
