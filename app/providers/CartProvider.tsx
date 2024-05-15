"use client";
import { CartContextProvider } from "../hooks/useCart";

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartContextProviderProps> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
