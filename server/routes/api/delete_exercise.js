const express = require("express");
const router = express.router();
const ExerCise = require("../../models/exercise_schema");

router.delete("/:exerciseKey", async (req, res) => {
  try {
    const exerciseKey = req.params.exerciseKey;
    const deletedExercise = await ExerCise.remove({ exerciseKey });
    res.status(201).json(deletedExercise);
  } catch (error) {
    console.err(error);
    res.json(500).json({ msg: "fail to delete exercise" });
  }
});
module.exports = router;
