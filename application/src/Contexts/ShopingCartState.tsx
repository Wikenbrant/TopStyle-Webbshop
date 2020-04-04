import React, { useReducer, useState } from "react";
import { Product } from "../generated/graphql";
import ShopingCartContext from "./ShopingCartContext";
import ShopingCartReducer, {
  ShopingCartActionTypes
} from "../Reducers/ShopingCartReducer";

const ShopingCartState: React.FC = ({ children }) => {
  const [{ cart, cartOpen }, dispatch] = useReducer(ShopingCartReducer, {
    cart: [],
    cartOpen: { open: false, anchorEl: null }
  });

  const AddProductToCart = (product: Product, quantity = 1) =>
    dispatch({
      type: ShopingCartActionTypes.ADD_PRODUCT,
      payload: { product, quantity }
    });

  const RemoveProductFromCart = (productId: number, quantity = 1) =>
    dispatch({
      type: ShopingCartActionTypes.REMOVE_PRODUCT,
      payload: { productId, quantity }
    });

  const CloseCart = () =>
    dispatch({
      type: ShopingCartActionTypes.CLOSE,
      payload: { open: false, anchorEl: null }
    });
  const OpenCart = (anchorEl: HTMLButtonElement) =>
    dispatch({
      type: ShopingCartActionTypes.OPEN,
      payload: { open: true, anchorEl }
    });
  return (
    <ShopingCartContext.Provider
      value={{
        cart,
        cartOpen,
        AddProductToCart,
        RemoveProductFromCart,
        OpenCart,
        CloseCart
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
};

export default ShopingCartState;
