import { ProductWithFlags } from "@pcc/shared";
import { ProductImageCarousel } from "../components/Product/ProductImageCarousel";
import { ProductDetails } from "../components/Product/ProductDetails";
import { ProductPriceAside } from "../components/Product/ProductPriceAside";
import { ProductDescription } from "../components/Product/ProductDescription";
import { ProductComments } from "../components/Product/ProductComments";
import { useRef, useState, useEffect } from "react";
import { addToCart } from "../services/cartService";
import {
  StatusAlert,
  StatusAlertHandles,
} from "../components/Alerts/StatusAlert";
import { useCart } from "../contexts/CartContext";

export function ProductPage({
  productWithFlags,
}: {
  productWithFlags: ProductWithFlags;
}) {
  const bottomRef = useRef(null);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const alertRef = useRef<StatusAlertHandles>(null);
  const { setNewCount } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 1,
      },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
  }, []);

  const handleClientAddToCart = async () => {
    try {
      const newLength = await addToCart(productWithFlags.id);
      setNewCount(newLength);

      alertRef.current?.showAlert("success", "Producto añadido al carrito");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alertRef.current?.showAlert(
        "error",
        "Error añadiendo producto al carrito",
      );
    }
  };
  return (
    <div className="container mx-auto p-6">
      <StatusAlert ref={alertRef} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProductImageCarousel
          images={[
            productWithFlags.thumbnail,
            "https://placehold.co/600x400",
            "https://placehold.co/600x500",
          ]}
        />{" "}
        <ProductDetails productWithFlags={productWithFlags} />{" "}
        <ProductPriceAside
          price={productWithFlags.price}
          discount={productWithFlags.discount}
          children={
            <button
              onClick={handleClientAddToCart}
              className="hidden lg:block mt-4 bg-orange-500 text-white py-2 px-4 rounded cursor-pointer w-full"
            >
              Añadir al carrito
            </button>
          }
        />{" "}
      </div>

      <div className="mt-10">
        <ProductDescription description={"Not Implemented"} />{" "}
      </div>

      <div className="mt-10" ref={bottomRef}>
        <ProductComments productWithFlags={productWithFlags} />{" "}
      </div>

      <div
        className={
          "lg:hidden fixed bottom-0 left-0 right-0 rounded w-full z-200 p-4 transition-transform " +
          (isBottomVisible
            ? "transform translate-y-full"
            : "transform translate-y-0")
        }
      >
        <button
          onClick={handleClientAddToCart}
          className="bg-orange-500 text-white py-2 px-4 rounded cursor-pointer w-full z-200"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
