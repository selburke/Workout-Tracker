const router = require('express').Router();
const Workout = require("../models/workout"); 

//Create Workout
router.post('/api/workouts', async (req, res) => {
    Workout.create(req.body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

//Add Exercise
router.put('/api/workouts/:id', (req, res) => {
    Workout.updateOne(
    {_id: req.params.id},
    {$push: { exercises: req.body} },
    (err, dbWorkout) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(dbWorkout);
        }
    });
  });

//GET Last Workout
router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
    {
        $addFields: {
        totalDuration: {
        $sum: '$exercises.duration',
        },
      },
    },
  ])
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});
     
//GET Last 7 Days
router.get('/api/workouts/range', async (req, res) => {
        Workout.aggregate([
          {
            $addFields: {
            totalDuration: {
            $sum: '$exercises.duration',
              },
            },
          },
        ])
        .sort({ day: -1 }).limit(7)
          .then(dbWorkout => {
               res.json(dbWorkout);
          }).catch(err => {
               console.log(err);
               res.sendStatus(500);
          })
      });

module.exports = router;