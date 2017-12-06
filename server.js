// dependencies
const express  = require('express');
const mongoose = require('mongoose');
const morgan   = require('morgan');
const methodOverride = require('method-override');
const session  = require('express-session');
const bcrypt 	 = require('bcrypt');
const app      = express();
require('pretty-error').start();
const PORT     = process.env.PORT || 3000;


const hashedString = bcrypt.hashSync('mandy', bcrypt.genSaltSync(10));
console.log(hashedString);

// process.env.MONGOB_URI
// connect to database
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cool-kicks';

mongoose.connect(mongoURI, { useMongoClient: true});
mongoose.Promise = global.Promise;


// test database connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log('Mongo running: ', mongoURI));

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

app.use(session({
  secret: 'kajfkdsfhdis', //random string here
  resave: false,
  saveUninitialized: false
}));


// controllers
const sneakersController = require('./controllers/sneakers.js');
const sessionsController = require('./controllers/session.js');
const commentsController = require('./controllers/comments.js');

app.use(methodOverride('_method'));
app.use('/sneakers', sneakersController);
app.use('/user', sessionsController);
app.use('/comments', commentsController);

// root route
app.get('/', (req, res) => res.redirect('/sneakers'));



// check if PORT is working and listening
app.listen(PORT, () => {
  console.log('===================================');
  console.log('Cool-Kicks app on port: ', PORT);
  console.log('===================================');
});
