let mongoose = require('mongoose');

// create a model class
let Movies = mongoose.Schema({
    Title: String,
    Description: String,
    Released: Number,
    Director: String,
    Genre: String
},
{
  collection: "Movies"
});

module.exports = mongoose.model('Movies',Movies);