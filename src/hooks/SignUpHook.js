import { useState } from "react";
import { type } from "../context/constants";
import { useAuthContext } from "./AuthHook";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch, baseURI } = useAuthContext();

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(null);

    let url;
    if (baseURI) url = `${baseURI}/api/user/signup`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) setError(json.error);
    else {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: type.LOGIN, payload: json });
    }

    setIsLoading(false);
  };

  return { signUp, error, isLoading };
};
