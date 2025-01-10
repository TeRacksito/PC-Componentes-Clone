import { ProductWithFlags } from "@pcc/shared";
import React, { useState } from "react";
import { FaShop } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FlagTagContainer } from "./FlagTagContainer";
import PcLogo from "/pc-logo.svg";

export function ProductCard({
  productWithFlags,
}: {
  productWithFlags: ProductWithFlags;
}) {
  const [transform, setTransform] = useState({
    translateX: 0,
    translateY: 0,
    rotate: 0,
  });

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const maxTranslate = 5;
    const maxRotate = 3;

    const normX = -x / (rect.width / 2);
    const normY = -y / (rect.height / 2);

    setTransform({
      translateX: normX * maxTranslate,
      translateY: normY * maxTranslate,
      rotate: normX * maxRotate,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ translateX: 0, translateY: 0, rotate: 0 });
  };

  return (
    <div
      id={productWithFlags.id}
      className="rounded shadow-orange-200 group hover:shadow-md max-w-xs mx-auto transition-shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/${productWithFlags.id}`} className="block">
        <div className="w-full flex items-center justify-center relative">
          <FlagTagContainer flags={productWithFlags.flags} />

          {productWithFlags.discount != 0 ? (
            <span className="absolute top-0 left-0 bg-red-700 text-white text-xs font-bold rounded px-2 py-1 z-10">
              -{productWithFlags.discount}%
            </span>
          ) : null}
          <img
            src={productWithFlags.thumbnail}
            alt={productWithFlags.name}
            className="object-scale-down mt-1 group-hover:scale-107 -z-10"
            style={{
              transform: `translate(${transform.translateX}px, ${transform.translateY}px) rotate(${transform.rotate}deg) scale(1.05)`,
              transition: "all 0.3s ease",
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-base mb-2">{productWithFlags.name}</h3>
          <span className="text-lg text-red-700 font-bold mb-4 mr-4">
            {Number(productWithFlags.price).toFixed(2)}€
          </span>
          {productWithFlags.discount != 0 ? (
            <span className="text-gray-500 line-through mr-2 text-sm">
              {(
                Number(productWithFlags.price) /
                (1 - Number(productWithFlags.discount) / 100)
              ).toFixed(0)}
              €
            </span>
          ) : null}
          <div className="text-sm text-gray-500 flex items-center gap-1">
            {productWithFlags.seller == "PcComponentes" ? (
              <img src={PcLogo} alt="PC Clone Logo" className="h-4" />
            ) : (
              <FaShop />
            )}
            Vendido por: <b>{productWithFlags.seller}</b>
          </div>
        </div>
      </Link>
    </div>
  );
}
