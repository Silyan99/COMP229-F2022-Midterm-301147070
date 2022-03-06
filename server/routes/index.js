/**
 * Name: Bharat Silyan
 * Student Id: 301147070
 * File Name: index.js
 */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let movies = require('../models/movies');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Welcome',
    movies: ''
   });
});

module.exports = router;
