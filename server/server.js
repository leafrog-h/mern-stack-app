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
const fetchUser = require('./routes/api/fetchuser')
const findUser = require('./routes/api.finduser')
app.use('/adduser', addUser);
app.use('/fetchuser', fetchUser)
app.use('/finduser', findUser)