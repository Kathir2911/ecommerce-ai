import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== itemId);
      }
      return prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const value = useMemo(() => {
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    return {
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    };
  }, [cartItems, addToCart, removeFromCart, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};