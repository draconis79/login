const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User   = require('../models/user.js');

// login
router.get('/login', (req, res) => {
res.render('login.ejs', {
  message: req.session.message,
  username: req.session.username
  });
});

// login data
// checking to see if the user is already a registered user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username});
    if (bcrypt.compareSync(req.body.password, user.password)){
      //below: if user tries to log in, find user in the database, and if password matches, then run the code below.
      req.session.username = req.body.username;
      req.session.logged  = true;
      console.log(req.session);
      res.redirect('/sneakers/test')
    } else {
     console.log('bad password')
     req.session.message = 'Username or password are incorrect';
     res.redirect('/user/login');
    }
  } catch (err) {
    console.log(err.message);
    req.session.message = 'Username or password are incorrect';
    res.redirect('/user/login');
  }
});

// register

router.get('/register', (req, res, next) => {
  res.render('register.ejs', {
    message: req.session.message,
    username: req.session.username
  });
});

router.post('/register', async (req, res) => {

// first we are going to hash the password
const password = req.body.password;
const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const username = req.body.username;
// lets create a object for our db entry;
const userDbEntry = {};

userDbEntry.username = req.body.username;
userDbEntry.password = passwordHash;

console.log(userDbEntry);

// lets put the password into the database, User schema
try {
  const user = await User.create(userDbEntry);
  console.log(user);
  // lets set up the session in here we can use the same code we created in the login
  req.session.username = user.username;
  req.session.logged  = true;
  res.redirect('/'); // redirecting user to login
 } catch (err) {
   console.log(err.message);
 }
});

router.get('/', (req, res) => {
  // this is where we render the login view
});

router.post('/', (req, res) => {
  // this is where we analyze the session variables after posting the form to this route
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/sneakers/home');
});

router.get('/update', (req, res) => {
  req.session.anyProperty = "something";
  console.log(req.session);
});

// export the controller
module.exports = router;
