export interface Product {
  id: string;
  name: string;
  href: string;
  price: string;
  discount?: string;
  seller: string;
  shadow_id?: string;
  offer_id?: string;
  brand: string;
  thumbnail: string;
  flags?: string;
  condition_status?: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string;
}
