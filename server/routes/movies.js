// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// call the movies model
let movies = require("../models/movies");

/* GET movies List page. READ */
router.get("/", (req, res, next) => {
  // find all movie in the books collection
  movies.find((err, list) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("movies/index", {
        title: "movies",
        list: list,
      });
    }
  });
});

//  GET the Movies Details page in order to add a new Movies
router.get("/add", (req, res, next) => {
  res.render("movies/details", {
    title: "Add Movie",
    list: {},
  });
});

// POST process the Movies Details page and create a new Movies - CREATE
router.post("/add", (req, res, next) => {
  var newMovie = new movies({
    Title: req.body.title,
    Description: req.body.description,
    Released: req.body.released,
    Director: req.body.director,
    Genre: req.body.genre,
  });
  movies.create(newMovie);
  res.redirect("/movies");
});

// GET the Movies Details page in order to edit an existing Movies
router.get("/:id", (req, res, next) => {
  var movieId = req.params["id"];
  movies.findById(movieId, function (err, movie) {
    if (err) {
      return console.error(err);
    } else {
      res.render("movies/details", {
        title: "Edit Movie",
        list: movie,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  var movieId = req.params["id"];
  movies.update({_id: movieId},
    {
      _id: movieId,
      Title: req.body.title,
      Description: req.body.description,
      Released: req.body.released,
      Director: req.body.director,
      Genre: req.body.genre,
    },
    function (err, result) {
      if (err) {
        return console.error(err);
      } else {
        console.log("Record Updated");
        res.redirect("/movies");
      }
    }
  );
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  var id = req.params["id"];

  movies.remove({ _id: id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
      res.redirect("/movies");
    }
  });
});

module.exports = router;
