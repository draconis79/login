const mongoose = require('mongoose');

const sneakerSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    color: String,
    price: Number,
    releaseDate: String,
    image: String,
    submitted_by: String
});

module.exports = mongoose.model('Sneaker', sneakerSchema);
