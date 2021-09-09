const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now(),
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Required."
      },
      name: {
        type: String,
        trim: true,
        required: "Required."
      },
      duration: {
        type: Number,
        required: "Required."
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    }
  ]
});



const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;