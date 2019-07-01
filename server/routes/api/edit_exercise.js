const express = require("express");
const router = express.router();
const ExerCise = require("../../models/exercise_schema");

router.get("/:exerciseKey", async (req, res) => {
  try {
    const exerciseKey = req.params.exerciseKey;
    const exerciseToEdit = await ExerCise.find({ exerciseKey });
    res.status(201).json(exerciseToEdit);
  } catch (err) {
    res.status(500).json({ meg: "fail to edit an exercise" });
  }
});

router.patch("/:exerciseKey", async (req, res) => {
  try {
    const { exercise, description, duration } = req.body;
    const exerciseKey = req.params.exerciseKey;
    const updatedExercise = await ExerCise.update(
      { exerciseKey },
      { $set: { exercise, description, duration } }
    );
    res.status(201).json(updatedExercise);
  } catch (error) {
    console.err(error);
    res.json(500).json({ msg: "fail to edit exercise" });
  }
});
module.exports = router;
