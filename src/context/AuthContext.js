import { createContext, useEffect, useReducer } from "react";
import { type } from "./constants";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {
        user: action.payload,
      };
    case type.LOGOUT:
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) dispatch({ type: type.LOGIN, payload: user });
  }, []);

  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
