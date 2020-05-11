module.exports = app => {
    const users = require("../controllers/users.controller");
    const verify = require("../verifyToken");
  
    var router = require("express").Router();
  
    // Create a new users
    router.post("/register", users.register);
  
    // login all Tutorials
    router.post("/login", users.login);
    router.post("/create", verify, users.createContact)
    router.get("/contacts", verify, users.findContactForUser);
  
  
    app.use('/api/user', router);
  };