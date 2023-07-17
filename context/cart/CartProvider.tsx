import React, {useContext, useEffect, useState} from "react";
import CartContext from "./CartContext";
import {getCookie, setCookies} from "cookies-next";


export const ProvideCart = ({children}: { children: React.ReactNode }) => {
  const value = useProvideCart();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

const useProvideCart = () => {
  const [cart, setCart] = useState({products: [], totalWeight: 0, totalWeightWithWage: 0})

  useEffect(() => {
    const initialCart = getCookie("cart");
    if (initialCart) {
      const cartItems = JSON.parse(initialCart as string);
      setCart(cartItems);
    }
  }, []);

  useEffect(() => {
    setCookies("cart", JSON.stringify(cart));
  }, [cart]);

  const updateCart = (data:any) => {
    setCart(data)
  };

  const value = {
    cart,
    updateCart,
  };

  return value;
};
