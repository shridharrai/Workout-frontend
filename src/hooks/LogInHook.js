import { useState } from "react";
import { type } from "../context/constants";
import { useAuthContext } from "./AuthHook";

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const logIn = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://workout-api-f3kn.onrender.com/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) setError(json.error);
    else {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context with the logedIn user
      dispatch({ type: type.LOGIN, payload: json });
    }

    setIsLoading(false);
  };

  return { logIn, error, isLoading };
};
