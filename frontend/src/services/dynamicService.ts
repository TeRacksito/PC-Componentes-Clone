export const dynamicFetch = async (slug: string) => {
  const response = await fetch(`/api/${slug}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dynamic data");
  }

  const data = await response.json();
  return data;
};
