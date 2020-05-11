const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:8081"
};

//routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
dotenv.config();


  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  const db = require("./model");
  db.sequelize.sync();

// //Middleware
// app.use(express.json())
//route middlewares
// app.use('/api/users', authRoute);
// app.use('/api/posts', postRoute);
require("./routes/user.routes")(app);


app.listen(3000, () => console.log('Up and Running'))