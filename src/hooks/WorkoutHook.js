import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error(
      "Workout context hook must be used inside the Wrokout context Provider"
    );
  }

  return context;
};
