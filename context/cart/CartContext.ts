import { createContext } from "react";
import { cartType } from "./cart-types";

export const initialContextValues: any = {
  cart: [],
};

const CartContext = createContext<any>(initialContextValues);

export default CartContext;
