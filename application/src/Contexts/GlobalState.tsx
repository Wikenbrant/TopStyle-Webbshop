import React from "react";
import TokenState from "./TokenState";
import ShopingCartState from "./ShopingCartState";

const GlobalState: React.FC = ({ children }) => {
  return (
    <TokenState>
      <ShopingCartState>{children}</ShopingCartState>
    </TokenState>
  );
};
export default GlobalState;
