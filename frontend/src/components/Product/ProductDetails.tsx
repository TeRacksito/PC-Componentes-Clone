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
        <span className= "underline text-nowrap">
          {productWithFlags.brand}
        </span>
      <div className="mt-2 text-xs flex items-center gap-2 text-gray-600">
        <span>Oferta: {productWithFlags.offer_id}</span>
        |
        <span>Cod. Artículo: {productWithFlags.shadow_id}</span>
      </div>
      <div className="text-sm text-gray-500 flex items-center gap-1 my-2">
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
