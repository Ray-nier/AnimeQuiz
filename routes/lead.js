var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// to collect the Collection from mongodb
const collection = mongoose.connection.collection('results');

/* GET lead page */
router.get('/', async function (req, res, next) {
  try {
    // fetching all the results from mongodb compass
    const results = await collection.find({}).toArray();

    // passing the results to display the scores
    res.render('lead', { title: 'Leaderboard', results });
  } catch (error) {
    console.error('Error fetching results:', error);
    next(error); 
  }
});

module.exports = router;
