var express = require('express');
var router = express.Router();


const difficulties= [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

  const categories = [
  { id: 31, name: 'Entertainment: Japanese Anime & Manga'}
 ];

 const types = [ 
  { id: 'multiple', name: 'Multiple Choice' },
  { id: 'boolean', name: 'True/False' }
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2', { title: 'Express',categories, difficulties, types});
});

module.exports = router;
