import { ProductWithFlags } from "@pcc/shared";
import { FaShop } from "react-icons/fa6";
import PcLogo from "/pc-logo.svg";

interface ProductDetailsProps {
  productWithFlags: ProductWithFlags;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  productWithFlags,
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold">{productWithFlags.name}</h2>
      <div className="mt-2 text-xs flex items-center gap-2">
        <span className="text-gray-600 underline text-nowrap">
          {productWithFlags.brand}
        </span>
        |
        <span className="text-gray-600">Oferta: {productWithFlags.offer_id}</span>
        |
        <span className="text-gray-600">Cod. Artículo: {productWithFlags.shadow_id}</span>
      </div>
      <div className="text-sm text-gray-500 flex items-center gap-1">
        {productWithFlags.seller == "PcComponentes" ? (
          <img src={PcLogo} alt="PC Clone Logo" className="h-4" />
        ) : (
          <FaShop />
        )}
        Vendido por: <b>{productWithFlags.seller}</b>
      </div>
    </div>
  );
};
