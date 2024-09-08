import { useEffect, useState } from "react";
import axios from "axios";

// components
import WorkoutDetails from "@/components/WorkoutDetails";
import WorkoutForm from "@/components/WorkoutForm";

// Workout interface
import { Workout } from "@/types/Workout";

// context hook
import { useWorkoutsContext } from "@/hooks/useWorkoutContext";

export default function Workouts() {
  const { workouts, dispatch } = useWorkoutsContext();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const resetSelectedWorkout = () => {
    // Reset to null to go back to "Add Workout" mode
    setSelectedWorkout(null);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get<Workout[]>(
          "http://localhost:8080/api/workouts"
        );
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  const handleEditWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center py-3 text-3xl">Workouts Page</h1>

      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <div>
          {workouts &&
            workouts.map((workout: Workout) => (
              <WorkoutDetails
                workout={workout}
                key={workout._id}
                onEdit={handleEditWorkout}
              />
            ))}
        </div>
        <div>
          <WorkoutForm
            selectedWorkout={selectedWorkout}
            resetSelectedWorkout={resetSelectedWorkout}
          />
        </div>
      </div>
    </div>
  );
}
