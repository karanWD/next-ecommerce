import { createContext } from "react";

export const initialContextValues: any = {
  cart: [],
};

const CartContext = createContext<any>(initialContextValues);

export default CartContext;
