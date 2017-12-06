const express = require('express');
const methodOverride = require('method-override');
const router  = express.Router();

// models
const Sneaker = require('../models/sneakers.js');
const Comment = require('../models/comments.js');


// middleware
router.use(methodOverride('_method'));
router.use(express.static('public'));

// routes

// home page route
// router.get('/home', async (req, res) => {
//   console.log("================");
//   console.log(req.session);
//   console.log("================");
//   res.render('home.ejs', {
//     username: req.session.username
//   });
// });

// top-picks page route
router.get('/about/:picks', async (req, res) => {
  console.log("================");
  console.log(req.session);
  console.log("================");
  let routeKey = "";
  if (req.params.picks == "picks") {
    routeKey = 'top-picks.ejs'
  }  else if (req.params.picks == "home") {
      routeKey = 'home.ejs'
    } else {
    routeKey = 'about.ejs'
  }
  res.render(routeKey, {
    username: req.session.username
  });
});

// // about page route
// router.get('/about', async (req, res) => {
//   console.log("================");
//   console.log(req.session);
//   console.log("================");
//   res.render('about.ejs', {
//     username: req.session.username
//   });
// });

router.get('/test', (req,res) => {
  res.send(req.session)
});

// index route
router.get('/', async (req, res) => {
  const allSneakers = await Sneaker.find();
  if(req.session.logged) {
    // res.send('sneakers index');
    res.render(
        'index.ejs', {
          sneaker, allSneakers,
          username: req.session.username
        });
} else {
 res.redirect('/user/login');
}
});

// new route
router.get('/new', async (req, res) => {
  res.render('new.ejs', {
    username: req.session.username
  });
});

// create route
router.post('/', async (req, res) => {
    try {
        const newSneaker = await Sneaker.create(req.body);
        res.redirect('/');
    } catch (err) {
        res.send(err.message);
    }
});

// show route
router.get('/:id', async (req, res) => {
    const oneSneaker = await Sneaker.findById(req.params.id);
    const comments = await Comment.find({
        sneaker: oneSneaker._id
    });
    res.render('show.ejs', {
        oneSneaker: oneSneaker,
        comments, comments,
        username: req.session.username
    });
});

// edit route
router.get('/:id/edit', async (req, res) => {
  const sneakers = await Sneaker.findById(req.params.id);
  res.render(
    'edit.ejs',
    {
      sneaker: sneakers,
      username: req.session.username
    }
  );
});

// delete route
router.delete('/:id', async (req, res) => {
  const deleteSneaker = await Sneaker.findByIdAndRemove(req.params.id);
  res.redirect('/sneakers');
});

module.exports = router;
