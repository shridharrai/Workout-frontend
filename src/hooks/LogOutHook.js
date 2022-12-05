import { type } from "../context/constants";
import { useAuthContext } from "./AuthHook";
import { useWorkoutContext } from "./WorkoutHook";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutContext();

  const logOut = () => {
    // remove user from localStorage
    localStorage.removeItem("user");

    // remove user from local state
    dispatch({ type: type.LOGOUT });
    workoutDispatch({ type: type.SET_WORKOUTS, payload: null });
  };

  return { logOut };
};
