import { ProductCard } from "../components/ProductCard/ProductCard";
import { Product } from "../types/apiTypes";

export function ProductPage({ product }: { product: Product }) {
  return <ProductCard product={product} />;
}
