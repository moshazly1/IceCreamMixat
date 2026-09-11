import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const STORAGE_KEY = "ice_cream_cart";

export function CartProvider({ children }) {
  // نقرأ البيانات من localStorage عند إنشاء الـ Context
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);

      if (storedCart) {
        return JSON.parse(storedCart);
      }

      return [];
    } catch (error) {
      console.error("Error reading cart:", error);
      return [];
    }
  });

  // كل ما cartItems تتغير، نحفظها
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  // إضافة منتج
  const addToCart = (item) => {
    const newItem = {
      ...item,
      cartItemId: Date.now(),
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // حذف منتج
  const removeFromCart = (cartItemId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  // تغيير الكمية
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId !== cartItemId) {
          return item;
        }

        let unitPrice = Number(item.basePrice);

        // سعر الـ flavor
        if (item.flavor) {
          unitPrice += Number(item.flavor.extra_price);
        }

        // أسعار الـ extras
        if (item.extras?.length > 0) {
          item.extras.forEach((extra) => {
            unitPrice += Number(extra.price);
          });
        }

        return {
          ...item,
          quantity: newQuantity,
          totalPrice: (unitPrice * newQuantity).toFixed(2),
        };
      }),
    );
  };

  // تفريغ السلة
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
