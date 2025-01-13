import { CartContent } from "@pcc/shared";

export const addToCart = async (product_id: string, quantity: number = 1) => {
  const response = await fetch(`http://localhost:5011/api/cart/${product_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to add product to cart");
  }

  const data = await response.json();

  if (data.type === "cartLength") {
    return data.data as number;
  } else {
    throw new Error("Invalid response");
  }
};

export const getCart = async () => {
  const response = await fetch("http://localhost:5011/api/cart", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await response.json();

  if (data.type === "cart") {
    return data.data as CartContent[];
  } else {
    throw new Error("Invalid response");
  }
};

export const updateCartItemQuantity = async (
  product_id: string,
  quantity: number = 1,
) => {
  const response = await fetch(`http://localhost:5011/api/cart/${product_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart item quantity");
  }

  const data = await response.json();

  if (data.type === "cartLength") {
    return data.data as number;
  } else {
    throw new Error("Invalid response");
  }
};

export const removeCartItem = async (product_id: string) => {
  const response = await fetch(`http://localhost:5011/api/cart/${product_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to add product to cart");
  }

  const data = await response.json();

  if (data.type === "cartLength") {
    return data.data as number;
  } else {
    throw new Error("Invalid response");
  }
};
