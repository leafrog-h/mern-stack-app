const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../../models/user_schema');

// for login validation 
router.post('/signup', async (req, res) => {
    try {
            const {email, password, date} = req.body
            const salt = await bcrypt.genSalt(10)
            const hashedpwd = await bcrypt.hash(password, salt)
            const createdUser = await new User(email, hashedpwd, date)
            await createdUser.save()
            res.status(201).json(createdUser)
    } catch (error) {
            res.status(500).json('fail to add a user')
    }
   
})
module.exports = router;