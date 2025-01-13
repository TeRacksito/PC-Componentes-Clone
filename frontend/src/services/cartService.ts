export const addToCart = async (product_id: string) => {
  const response = await fetch("http://localhost:5011/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ product_id }),
  });

  if (!response.ok) {
    throw new Error("Failed to add product to cart");
  }

  return true;
};
