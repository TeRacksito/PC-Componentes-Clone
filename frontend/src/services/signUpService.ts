import { SuccessResponse, ErrorResponse } from "@pcc/shared";

export const signUp = async (
  name: string,
  surname: string,
  email: string,
  username: string,
  password: string,
) => {
  const response = await fetch("http://localhost:5011/api/client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, surname, email, username, password }),
  });
  
  if (response.status === 200) return { type: "success" } as SuccessResponse;
  
  const data = (await response.json()) as SuccessResponse | ErrorResponse;

  if (data.type === "error") {
    throw new Error(data.message);
  }

  return data as SuccessResponse;
};
