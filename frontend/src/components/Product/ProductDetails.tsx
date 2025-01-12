import { ProductWithFlags } from "@pcc/shared";

interface ProductDetailsProps {
  productWithFlags: ProductWithFlags;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  productWithFlags,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold">{productWithFlags.name}</h2>
      <p className="mt-2 text-gray-600">{productWithFlags.brand}</p>
      <p className="mt-2 text-gray-600">{productWithFlags.price}</p>
    </div>
  );
};
