import React, { useState, useContext, useReducer } from "react";
import UserContext from "./UserContext";
import {
  LoginMutationVariables,
  useLoginMutation,
  useLogoutMutation,
} from "../generated/graphql";
import jwtDecode from "jwt-decode";
import TokenContext from "./TokenContext";
import UserReducer, { UserActionTypes } from "../Reducers/UserReducer";

const UserState: React.FC = ({ children }) => {
  const { SetAccessToken, Loggedin } = useContext(TokenContext);
  const [{ name, loggedIn, errors, userId }, dispatch] = useReducer(
    UserReducer,
    { loggedIn: Loggedin() }
  );
  const [Login] = useLoginMutation();
  const [Logout] = useLogoutMutation();
  const LogIn = async (input: LoginMutationVariables) => {
    const { data, errors } = await Login({ variables: input });

    if (data) {
      SetAccessToken(data.login.accessToken);
      const { name, userId } = jwtDecode<{
        exp: number;
        iat: number;
        name: string;
        userId: number;
      }>(data.login.accessToken);
      dispatch({ type: UserActionTypes.SET_NAME, payload: name });
      dispatch({ type: UserActionTypes.SET_USERID, payload: userId });
      dispatch({ type: UserActionTypes.SET_LOGGEDIN, payload: true });
      return true;
    }
    dispatch({ type: UserActionTypes.SET_ERRORS, payload: errors?.join(", ") });
    return false;
  };
  const LogOut = async () => {
    const resp = await Logout();
    if (resp.data && resp.data.logout) {
      dispatch({ type: UserActionTypes.LOGOUT });
      SetAccessToken("");
      return true;
    }
    return false;
  };
  return (
    <UserContext.Provider
      value={{ loggedIn, LogIn, LogOut, name, userId, errors }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
