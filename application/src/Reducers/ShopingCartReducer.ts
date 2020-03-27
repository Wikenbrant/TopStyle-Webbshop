import { Product } from "../generated/graphql";
import {
  InitialShopingCartStateType,
  CartLine
} from "../Contexts/ShopingCartContext";

const ShopingCartReducer: React.Reducer<
  { cart: CartLine[] },
  ShopingCartActions
> = (state, action) => {
  switch (action.type) {
    case ShopingCartActionTypes.ADD_PRODUCT: {
      const updatedCart = [...state.cart];
      const updatedItemIndex = updatedCart.findIndex(
        item => item.product.id === action.payload.product.id
      );
      if (updatedItemIndex < 0) {
        updatedCart.push({
          product: action.payload.product,
          quantity: action.payload.quantity
        });
      } else {
        const updatedItem = {
          ...updatedCart[updatedItemIndex]
        };
        updatedItem.quantity += action.payload.quantity;
        updatedCart[updatedItemIndex] = updatedItem;
      }
      return { ...state, cart: updatedCart };
    }

    case ShopingCartActionTypes.REMOVE_PRODUCT: {
      const updatedCart = [...state.cart];
      const updatedItemIndex = updatedCart.findIndex(
        item => item.product.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity -= action.payload.quantity;
      if (updatedItem.quantity <= 0) {
        updatedCart.splice(updatedItemIndex, 1);
      } else {
        updatedCart[updatedItemIndex] = updatedItem;
      }
      return { ...state, cart: updatedCart };
    }
    default:
      return state;
  }
};

export default ShopingCartReducer;

type ShopingCartActions = AddItem | RemoveItem;

type AddItem = {
  type: ShopingCartActionTypes.ADD_PRODUCT;
  payload: { product: Product; quantity: number };
};

type RemoveItem = {
  type: ShopingCartActionTypes.REMOVE_PRODUCT;
  payload: { productId: number; quantity: number };
};

export enum ShopingCartActionTypes {
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT"
}
