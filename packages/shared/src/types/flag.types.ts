import { Product } from "./product.types";

export type Flag = {
  id: string;
  name: string;
  bg_color: string;
  border_color?: string;
  font_color: string;
  description?: string;
};

export type ProductWithFlags = Product & {
  flags: Flag[];
};
