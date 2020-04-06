import React from "react";
import ShopingCartState from "./ShopingCartState";
import UserState from "./UserState";

const GlobalState: React.FC = ({ children }) => {
  return (
    <UserState>
      <ShopingCartState>{children}</ShopingCartState>
    </UserState>
  );
};
export default GlobalState;
