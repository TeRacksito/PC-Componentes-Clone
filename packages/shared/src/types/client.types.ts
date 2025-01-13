export type Client = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
};

export type LoginResponse = {
  client: Client;
};

export type ClientProduct = {
  client_id: string;
  product_id: string;
  quantity: number;
};
