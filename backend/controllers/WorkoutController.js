const Workout = require("../models/WorkoutModel");
const mongoose = require("mongoose");

// get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  if (!workout) {
    return res.status(404).json({ error: error.message });
  }

  res.status(200).json(workout);
};

// post new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all field",
      emptyFields,
    });
  }
  // connnect to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // uncomented the code below since its crashes nodemoon
  // res.json({ mssg: "POST a new workout" });
};

// delete workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// const updateWorkout = async (req, res) => {
//   const { id } = req.params;

//   // Check if the ID is a valid MongoDB ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such workout" });
//   }

//   try {
//     // Find and update the workout by ID, returning the updated document
//     const workout = await Workout.findByIdAndUpdate(
//       { _id: id },
//       {
//         ...req.body,
//       },
//       { new: true } // Ensures the updated document is returned
//     );

//     // If no workout found, send an error
//     if (!workout) {
//       return res.status(400).json({ error: "No such workout" });
//     }

//     // Respond with the updated workout
//     res.status(200).json(workout);
//   } catch (error) {
//     // Handle server errors or other issues
//     res.status(500).json({ error: "Failed to update workout" });
//   }
// };

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
