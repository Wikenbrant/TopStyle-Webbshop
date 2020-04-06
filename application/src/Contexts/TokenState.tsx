import React, { useState } from "react";
import TokenContext from "./TokenContext";

const TokenState: React.FC = ({ children }) => {
  const [token, setToken] = useState("");

  const SetAccessToken = (token: string) =>
    localStorage.setItem("token", token);
  const GetAccessToken = () => localStorage.getItem("token") ?? "";

  return (
    <TokenContext.Provider value={{ SetAccessToken, GetAccessToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenState;
