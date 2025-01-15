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

  if (!response.ok) {
    throw new Error("Sign up failed");
  }

  return true;
};
