import { createContext, useReducer } from "react";
import { type } from "./constants";

export const WorkoutContext = createContext();

export const WorkoutReducer = (state, action) => {
  switch (action.type) {
    case type.SET_WORKOUTS:
      return {
        workouts: action.payload,
      };
    case type.CREATE_WORKOUT:
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case type.DELETE_WORKOUT:
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
