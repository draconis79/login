const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: {type: String, require: true, index: {unique: true}},
    password: String
});

module.exports = mongoose.model('UsersSchema', UsersSchema);
