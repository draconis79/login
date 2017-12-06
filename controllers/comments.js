const express = require('express');
const router = express.Router();

const Comment = require('../models/comments.js');

router.post('/', async (req, res) => {
  console.log('body data: ', req.body);
  try {
    const createdComment = await Comment.create(req.body);
    res.redirect('/sneakers/' + createdComment.sneaker);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
