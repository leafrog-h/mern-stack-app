const express = require('express')
const router = express.router()
const ExerCise = require('../../models/exercise_schema')

router.post('/create/:id', async (req, res) => {
    try {
        const createdExercise = await ExerCise({...req.body})  // every exercise created with specific route: id has an identical userID
        res.status(201).json(createdExercise)
    } catch (err) {
        res.status(500).json('fail to create a new exercise')
    }
})


module.exports = router