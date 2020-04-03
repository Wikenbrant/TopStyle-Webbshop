import React, { useState } from "react";
import TokenContext from "./TokenContext";

const TokenState: React.FC = ({ children }) => {
  const [token, setToken] = useState("");

  const SetAccessToken = (token: string) => setToken(token);
  const GetAccessToken = () => token;

  return (
    <TokenContext.Provider value={{ SetAccessToken, GetAccessToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenState;
