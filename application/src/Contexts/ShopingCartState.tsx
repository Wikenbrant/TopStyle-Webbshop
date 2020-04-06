import React, { useReducer, useState } from "react";
import {
  Product,
  useCreateOrderMutation,
  CreateOrderMutation,
} from "../generated/graphql";
import ShopingCartContext from "./ShopingCartContext";
import ShopingCartReducer, {
  ShopingCartActionTypes,
} from "../Reducers/ShopingCartReducer";
import { ExecutionResult } from "graphql";

const ShopingCartState: React.FC = ({ children }) => {
  const [{ cart, cartOpen }, dispatch] = useReducer(ShopingCartReducer, {
    cart: [],
    cartOpen: { open: false, anchorEl: null },
  });

  const AddProductToCart = (product: Product, quantity = 1) =>
    dispatch({
      type: ShopingCartActionTypes.ADD_PRODUCT,
      payload: { product, quantity },
    });
  const SetProductToCart = (product: Product, quantity = 1) =>
    dispatch({
      type: ShopingCartActionTypes.SET_PRODUCT,
      payload: { product, quantity },
    });
  const RemoveProductFromCart = (productId: number, quantity = 1) =>
    dispatch({
      type: ShopingCartActionTypes.REMOVE_PRODUCT,
      payload: { productId, quantity },
    });

  const CloseCart = () =>
    dispatch({
      type: ShopingCartActionTypes.CLOSE,
      payload: { open: false, anchorEl: null },
    });
  const OpenCart = (anchorEl: HTMLButtonElement | null) =>
    anchorEl
      ? dispatch({
          type: ShopingCartActionTypes.OPEN,
          payload: { open: true, anchorEl },
        })
      : CloseCart();

  const [CreateOrder, result] = useCreateOrderMutation();
  const CheckOut = async () => {
    const response = await CreateOrder({
      variables: {
        input: {
          orderDetails: cart.map(
            ({ product: { productId, price }, quantity }) => ({
              productId: productId,
              quantity,
              sum: price * quantity,
            })
          ),
        },
      },
    });
    return response;
  };
  const Clear = () => dispatch({ type: ShopingCartActionTypes.CLEAR });
  return (
    <ShopingCartContext.Provider
      value={{
        cart,
        cartOpen,
        AddProductToCart,
        SetProductToCart,
        RemoveProductFromCart,
        OpenCart,
        CloseCart,
        CheckOut,
        Clear,
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
};

export default ShopingCartState;
