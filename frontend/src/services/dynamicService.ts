export const dynamicFetch = async (slug: string) => {
  const response = await fetch(`http://localhost:5011/api/${slug}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dynamic data");
  }

  const data = await response.json();
  return data;
};
