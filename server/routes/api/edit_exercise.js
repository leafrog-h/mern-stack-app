const express = require("express");
const router = express.router();
const ExerCise = require("../../models/exercise_schema");

router.post("/:exerciseKey", async (req, res) => {
  try {
    const exerciseKey = req.params.exerciseKey;
    const exerciseToEdit = await ExerCise.find({ exerciseKey });
    res.status(201).json(exerciseToEdit);
  } catch (err) {
    res.status(500).json({ msg: "fail to edit an exercise" });
  }
});

module.exports = router;
