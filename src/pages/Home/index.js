import { useEffect } from "react";
import WorkoutDetails from "../../components/WorkoutDetails";
import WorkoutForm from "../../components/WorkoutForm";
import { type } from "../../context/constants";
import { useAuthContext } from "../../hooks/AuthHook";
import { useWorkoutContext } from "../../hooks/WorkoutHook";
import "./index.css";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user, baseURI } = useAuthContext();

  useEffect(() => {
    let url;
    if (baseURI) url = `${baseURI}/api/workouts`;

    const fetchWorkouts = async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: type.SET_WORKOUTS, payload: json });
      }
    };

    if (user && baseURI) fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
