import { Product } from "../generated/graphql";
import { CartLine } from "../Contexts/ShopingCartContext";

type ShopingCartActions = SetItem | AddItem | RemoveItem | OpenCart | CloseCart;

type AddItem = {
  type: ShopingCartActionTypes.ADD_PRODUCT;
  payload: { product: Product; quantity: number };
};

type RemoveItem = {
  type: ShopingCartActionTypes.REMOVE_PRODUCT;
  payload: { productId: number; quantity: number };
};

type SetItem = {
  type: ShopingCartActionTypes.SET_PRODUCT;
  payload: { product: Product; quantity: number };
};

type OpenCart = {
  type: ShopingCartActionTypes.OPEN;
  payload: { open: true; anchorEl: HTMLButtonElement };
};

type CloseCart = {
  type: ShopingCartActionTypes.CLOSE;
  payload: { open: false; anchorEl: null };
};

export enum ShopingCartActionTypes {
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  SET_PRODUCT = "SET_PRODUCT",
  OPEN = "OPEN",
  CLOSE = "CLOSE"
}

const ShopingCartReducer: React.Reducer<
  {
    cart: CartLine[];
    cartOpen: { open: boolean; anchorEl: HTMLButtonElement | null };
  },
  ShopingCartActions
> = (state, action) => {
  switch (action.type) {
    case ShopingCartActionTypes.SET_PRODUCT: {
      const updatedCart = [...state.cart];
      const updatedItemIndex = updatedCart.findIndex(
        item => item.product.productId === action.payload.product.productId
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

        updatedItem.quantity = action.payload.quantity;
        if (updatedItem.quantity <= 0) {
          updatedCart.splice(updatedItemIndex, 1);
        } else {
          updatedCart[updatedItemIndex] = updatedItem;
        }
      }
      return { ...state, cart: updatedCart };
    }
    case ShopingCartActionTypes.ADD_PRODUCT: {
      const updatedCart = [...state.cart];
      const updatedItemIndex = updatedCart.findIndex(
        item => item.product.productId === action.payload.product.productId
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
        item => item.product.productId === action.payload.productId
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

    case ShopingCartActionTypes.OPEN: {
      return { ...state, cartOpen: { ...action.payload } };
    }
    case ShopingCartActionTypes.CLOSE: {
      return { ...state, cartOpen: { ...action.payload } };
    }
    default:
      return state;
  }
};

export default ShopingCartReducer;
