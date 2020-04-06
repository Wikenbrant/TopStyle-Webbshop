import { createContext } from "react";
import { LoginMutationVariables } from "../generated/graphql";

export type InitialUserstate = {
  loggedIn: boolean;
  name?: string;
  userId?: number;
  errors?: string;
  LogIn: ({
    email,
    password
  }: LoginMutationVariables) => boolean | Promise<boolean>;
  LogOut: () => boolean | Promise<boolean>;
};

const initialState: InitialUserstate = {
  loggedIn: false,
  LogIn: ({ email, password }: LoginMutationVariables) => Boolean(email),
  LogOut: () => Boolean("")
};

const UserContext = createContext<InitialUserstate>(initialState);

export default UserContext;
