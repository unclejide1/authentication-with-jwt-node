const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//routes
const authRoute = require('./routes/auth')

dotenv.config();

//connect to db
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true  },
 () => console.log('connected to db')
)

//Middleware
app.use(express.json())
//route middlewares
app.use('/api/users', authRoute);


app.listen(3000, () => console.log('Up and Running'))