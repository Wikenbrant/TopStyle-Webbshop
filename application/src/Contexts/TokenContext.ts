import { createContext } from "react";

export type InitialTokenstate = {
  SetAccessToken: (token: string) => void;
  GetAccessToken: () => string;
};

const initialState: InitialTokenstate = {
  SetAccessToken: (token: string) => {},
  GetAccessToken: () => ""
};

const TokenContext = createContext<InitialTokenstate>(initialState);

export default TokenContext;
