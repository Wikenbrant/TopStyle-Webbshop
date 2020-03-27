import React, { useReducer } from "react";
import { Product } from "../generated/graphql";
import ShopingCartContext from "./ShopingCartContext";
import ShopingCartReducer, {
  ShopingCartActionTypes
} from "../Reducers/ShopingCartReducer";

const GlobalState: React.FC = ({ children }) => {
  const [{ cart }, dispatch] = useReducer(ShopingCartReducer, { cart: [] });

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

  return (
    <ShopingCartContext.Provider
      value={{ cart, AddProductToCart, RemoveProductFromCart }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
};

export default GlobalState;
