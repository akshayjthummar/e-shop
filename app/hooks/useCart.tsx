import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductCart: (product: CartProductType) => void;
  handleRemoveProduct: (product: CartProductType) => void;
  handleCartQtyIncrese: (product: CartProductType) => void;
  handleCartQtyDecrese: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cartProducts: CartProductType[] | null = JSON.parse(cartItems);

    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");

    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setCartProducts(cartProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          { total: 0, qty: 0 }
        );
        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotal();
  }, [cartProducts]);

  const handleAddProductCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product added to cart");
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleCartQtyIncrese = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Ooops! Maximum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },

    [cartProducts]
  );

  const handleCartQtyDecrese = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("Ooops! Minimum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },

    [cartProducts]
  );

  const handleRemoveProduct = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filterProduct = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filterProduct);
        toast.success("Product removed");
        localStorage.setItem("eShopCartItems", JSON.stringify(filterProduct));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    toast.success("Your cart is cleared");
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      localStorage.setItem("eShopPaymentIntent", JSON.stringify(value));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductCart,
    handleRemoveProduct,
    handleCartQtyIncrese,
    handleCartQtyDecrese,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContexProvider");
  }

  return context;
};
