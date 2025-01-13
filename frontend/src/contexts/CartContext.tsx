import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCart } from "../services/cartService";

type CartContextProps = {
  count: number;
  setNewCount: (value: number) => void;
  reloadCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await getCart();
        setCount(cart.reduce((acc, item) => acc + item.quantity, 0));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [reload]);

  const setNewCount = async (value: number) => {
    console.log("Setting new count:", value);

    setCount(value);
  };

  const reloadCart = () => {
    setReload(!reload);
  };
  return (
    <CartContext.Provider value={{ count, setNewCount, reloadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
