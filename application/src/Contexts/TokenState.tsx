import React, { useState } from "react";
import TokenContext from "./TokenContext";
import JwtDecode from "jwt-decode";

const TokenState: React.FC = ({ children }) => {
  const SetAccessToken = (token: string) =>
    localStorage.setItem("token", token);
  const GetAccessToken = () => localStorage.getItem("token") ?? "";
  const Loggedin = () => GetAccessToken() !== "";
  const Name = () => JwtDecode<{ name: string }>(GetAccessToken()).name;
  return (
    <TokenContext.Provider
      value={{ SetAccessToken, GetAccessToken, Loggedin, Name }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenState;
