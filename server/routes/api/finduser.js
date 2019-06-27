const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../../models/user_schema');

// for signup validation and save data to db
router.post('/login', async (req, res) => {
    const user = User.findOne({email: req.body.email})
    if (!user) return res.status(400).json('email incorrect')
    try {
        if (await bcrypt.compare(req.body.password, user.password)) res.status(201).json(user)
    } catch (error) {
        res.status(400).json('incorrect password')
    }
})

module.exports = router;