const express = require('express')
const router = express.router()
const Exercise = require('../../models/exerciseschema')

router.get('/exercise_list/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const exerciseList = await Exercise.find({userId})
        res.status(201).json(exerciseList)
    } catch (err) {
        res.status(500).json('cannot find user')
    }
})


module.exports = router