import { LoginResponse } from "@pcc/shared";

export const login = async (identifier: string, password: string) => {
  const response = await fetch("http://localhost:5011/api/client/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ identifier, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data as LoginResponse;
};

export const getUser = async () => {
  const response = await fetch("http://localhost:5011/api/client", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  return data as LoginResponse;
};
