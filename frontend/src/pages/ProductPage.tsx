import { Product } from "@pcc/shared";
import { ProductCard } from "../components/ProductCard/ProductCard";

export function ProductPage({ product }: { product: Product }) {
  return <ProductCard product={product} />;
}
