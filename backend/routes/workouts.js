const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/WorkoutController");
const router = express.Router();

// GET all workouts
router.get("/", getAllWorkouts);

// GET a single workout
router.get("/:id", getSingleWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.put("/:id", updateWorkout);

module.exports = router;
