import { ProductWithFlags } from "./flag.types";

export type Product = {
  id: string;
  name: string;
  price: number;
  discount?: number;
  seller: string;
  shadow_id?: number;
  offer_id?: string;
  brand: string;
  thumbnail: string;
};

export type PaginatedProducts = {
  page: number;
  maxPages: number;
  orderCriteria: string;
  availableOrderCriteria: string[];
  totalProducts: number;
  products: ProductWithFlags[];
};

export type OrderCriteria = {};
