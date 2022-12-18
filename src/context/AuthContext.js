import { createContext, useEffect, useReducer } from "react";
import { type } from "./constants";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case type.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case type.SET_BASE_URI:
      return {
        ...state,
        baseURI: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
    baseURI: null,
  });

  useEffect(() => {
    const baseURI = process.env.REACT_APP_BASE_URI;
    if (baseURI) dispatch({ type: type.SET_BASE_URI, payload: baseURI });

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
