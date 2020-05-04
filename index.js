const express = require('express');
const app = express();
const authRoute = require('./routes/auth')


app.use('/api/users', authRoute);


app.listen(3000, () => console.log('Up and Running'))