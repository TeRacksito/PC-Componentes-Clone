import { Product, ProductWithFlags } from "@pcc/shared";
import { ProductCard } from "../components/ProductCard/ProductCard";

export function ProductPage({ productWithFlags }: { productWithFlags: ProductWithFlags }) {
  return <ProductCard productWithFlags={productWithFlags} />;
}
