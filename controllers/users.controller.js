const db = require("../model");
const User = db.users;
const Contact = db.contacts;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

//validation
const {registerValidation, loginValidation}  = require('../validation');

// Create and Save a new User
exports.register = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };

  // Save Tutorial in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Find a single Tutorial with an id
exports.login = (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
try{
    User.findOne({where: {email: req.body.email}})
    .then(async data => {
        if(!data) return res.status(400).send('Email or Password is wrong');
        const validPassword = await bcrypt.compare(req.body.password, data.password)

        if(!validPassword) return res.status(400).send('Email or Password is wrong');
        const token = jwt.sign({id: data.id, email: data.email}, process.env.TOKEN_SECRET)
        console.log(token)
        res.header('auth-token', token).send(token)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with email=" + req.body.email
      });
    });
    }catch(err){
        res.status(400).send("not logged in")
    }
  
};

exports.createContact = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    const contact = {
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        userId: req.user.id
    }

    Contact.create(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
}

exports.findContactForUser = (req, res) => {

    User.findByPk(req.user.id, { include: ["contacts"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
}
