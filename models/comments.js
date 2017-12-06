const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  author: String,
  content: { type: String, required: true },
  sneaker: { type: mongoose.Schema.Types.ObjectId, ref: 'Sneaker'}
});

module.exports = mongoose.model('Comment', commentSchema);
