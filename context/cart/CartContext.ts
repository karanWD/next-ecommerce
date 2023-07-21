import {createContext} from "react";
import {CartType} from "../../types";

export const initialContextValues: CartType = {
    cart: {
        products: [],
        totalCartWeightWithWage: 0,
        totalCartWeight: 0,
        updatedAt: ""
    },
    updateCart: () => {}
};

const CartContext = createContext<CartType>(initialContextValues);

export default CartContext;
