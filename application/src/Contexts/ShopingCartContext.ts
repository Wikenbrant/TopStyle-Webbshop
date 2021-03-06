import { createContext } from "react";
import { Product, CreateOrderMutation } from "../generated/graphql";
import { ExecutionResult } from "graphql";

export type InitialShopingCartStateType = {
  cart: CartLine[];
  AddProductToCart: (product: Product, quantity: number) => void;
  SetProductToCart: (product: Product, quantity: number) => void;
  RemoveProductFromCart: (productId: number, quantity: number) => void;
  OpenCart: (anchorEl: HTMLButtonElement | null) => void;
  CloseCart: () => void;
  cartOpen: { open: boolean; anchorEl: HTMLButtonElement | null };
  CheckOut: () =>
    | ExecutionResult<CreateOrderMutation>
    | Promise<ExecutionResult<CreateOrderMutation>>;
  Clear: () => void;
};
export type CartLine = { product: Product; quantity: number };
const initialState: InitialShopingCartStateType = {
  cart: [],
  AddProductToCart: (product) => {},
  SetProductToCart: (product) => {},
  RemoveProductFromCart: (productId) => {},
  OpenCart: (anchorEl) => {},
  CloseCart: () => {},
  cartOpen: { open: false, anchorEl: null },
  CheckOut: () => ({} as ExecutionResult<CreateOrderMutation>),
  Clear: () => {},
};

const ShopingCartContext = createContext<InitialShopingCartStateType>(
  initialState
);

export default ShopingCartContext;
