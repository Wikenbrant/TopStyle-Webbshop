type UserActions = SetName | SetUserId | SetLoggedIn | SetErrors | LogOut;

type SetName = { type: UserActionTypes.SET_NAME; payload: string };
type SetUserId = { type: UserActionTypes.SET_USERID; payload: number };
type SetLoggedIn = { type: UserActionTypes.SET_LOGGEDIN; payload: boolean };
type SetErrors = { type: UserActionTypes.SET_ERRORS; payload?: string };
type LogOut = { type: UserActionTypes.LOGOUT };

export enum UserActionTypes {
  SET_NAME = "SET_NAME",
  SET_USERID = "SET_USERID",
  SET_LOGGEDIN = "SET_LOGGEDIN",
  SET_ERRORS = "SET_ERRORS",
  LOGOUT = "LOGOUT",
}
const UserReducer: React.Reducer<
  {
    name?: string;
    userId?: number;
    loggedIn: boolean;
    errors?: string;
  },
  UserActions
> = (state, action) => {
  switch (action.type) {
    case UserActionTypes.SET_NAME: {
      return { ...state, name: action.payload };
    }
    case UserActionTypes.SET_USERID: {
      return { ...state, userId: action.payload };
    }
    case UserActionTypes.SET_LOGGEDIN: {
      return { ...state, loggedIn: action.payload };
    }
    case UserActionTypes.SET_ERRORS: {
      return { ...state, errors: action.payload };
    }
    case UserActionTypes.LOGOUT: {
      return { loggedIn: false };
    }
    default:
      return state;
  }
};

export default UserReducer;
