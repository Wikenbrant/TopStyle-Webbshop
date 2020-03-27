import { createContext } from "react";
import { Product } from "../generated/graphql";

export type InitialShopingCartStateType = {
  cart: CartLine[];
  AddProductToCart: (product: Product, quantity: number) => void;
  RemoveProductFromCart: (productId: number, quantity: number) => void;
};
export type CartLine = { product: Product; quantity: number };
const initialState: InitialShopingCartStateType = {
  cart: [],
  AddProductToCart: product => {},
  RemoveProductFromCart: productId => {}
};

const ShopingCartContext = createContext<InitialShopingCartStateType>(
  initialState
);

export default ShopingCartContext;
