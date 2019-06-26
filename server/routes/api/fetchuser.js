const express = require('express')
const router = express.router()
const User = require('../../userschema')

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId)
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json('cannot find user')
    }
})


module.exports = router