import { createContext } from "react";
import { Product } from "../generated/graphql";

export type InitialShopingCartStateType = {
  cart: CartLine[];
  AddProductToCart: (product: Product, quantity: number) => void;
  RemoveProductFromCart: (productId: number, quantity: number) => void;
  OpenCart: (anchorEl: HTMLButtonElement) => void;
  CloseCart: () => void;
  cartOpen: { open: boolean; anchorEl: HTMLButtonElement | null };
};
export type CartLine = { product: Product; quantity: number };
const initialState: InitialShopingCartStateType = {
  cart: [],
  AddProductToCart: product => {},
  RemoveProductFromCart: productId => {},
  OpenCart: anchorEl => {},
  CloseCart: () => {},
  cartOpen: { open: false, anchorEl: null }
};

const ShopingCartContext = createContext<InitialShopingCartStateType>(
  initialState
);

export default ShopingCartContext;
