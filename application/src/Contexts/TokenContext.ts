import { createContext } from "react";

export type InitialTokenstate = {
  SetAccessToken: (token: string) => void;
  GetAccessToken: () => string;
  Loggedin: () => boolean;
  Name: () => string;
};

const initialState: InitialTokenstate = {
  SetAccessToken: (token: string) => {},
  GetAccessToken: () => "",
  Name: () => "",
  Loggedin: () => Boolean(""),
};

const TokenContext = createContext<InitialTokenstate>(initialState);

export default TokenContext;
