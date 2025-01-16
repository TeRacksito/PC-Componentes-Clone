import { CartContent } from "@pcc/shared";
import { useEffect, useState } from "react";
import {
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../services/cartService";
import PcLogo from "/pc-logo.svg";
import { FaShop } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setNewCount, reloadCart } = useCart();

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, { product, quantity }) => {
      return total + product.price * quantity;
    }, 0);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        console.log("Cart:", cart);

        setCartItems(cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number,
  ) => {
    try {
      const newLength = await updateCartItemQuantity(productId, newQuantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
      setNewCount(newLength);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update item quantity.");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeCartItem(productId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product.id !== productId),
      );
      reloadCart();
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item from cart.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tu carrito</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Aquí no hay nada.</div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(({ product, quantity }) => {
              return (
                <div
                  key={product.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 "
                >
                  <Link
                    to={`/${product.id}`}
                    className="flex items-center col-span-1 md:col-span-2"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        {product.seller == "PcComponentes" ? (
                          <img
                            src={PcLogo}
                            alt="PC Clone Logo"
                            className="h-4"
                          />
                        ) : (
                          <FaShop />
                        )}
                        Vendido por: <b>{product.seller}</b>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-gray-500 line-through mr-2">
                          {Math.ceil(product.price / (1 - product.discount / 100))}€
                        </span>
                        <span className="text-red-700 font-bold">
                          {product.price.toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-row items-center justify-end col-span-1 md:col-span-1 gap-2">
                    <div className="flex items-center mb-0">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            Math.max(1, quantity - 1),
                          )
                        }
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.id,
                            Number(e.target.value),
                          )
                        }
                        className="w-12 text-center border-t border-b border-gray-200"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(product.id, quantity + 1)
                        }
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(product.id)}
                      className="text-red-700 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-bold">
              Total: {calculateTotalPrice().toFixed(2)}€
            </h2>
            <button className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer">
              Realizar pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}
