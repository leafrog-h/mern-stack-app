const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv')
app.use(express.json());

dotenv.config();
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true})
        .then(() => console.log('db connected'))
        .catch(e => console.log(e));

const port = process.env.PORT || 8080;  
app.listen(port, () => {
    console.log('server started on ' + port)
})

const addUser = require('./routes/api/adduser')
const findUser = require('./routes/api/finduser')
const createExercise = require('./routes/api/creat_exercise')
const exerciseList = require('./routes/api/exercise_list')
const editExercise = require('/routes/api/edit_exercise')

app.use('/signup', addUser);
app.use('/login', findUser)
app.use('/dashboard/create/', createExercise)   
app.use('./dashboard/exercise_list/', exerciseList)
app.use('/dashboard/:id/edit', editExercise)
