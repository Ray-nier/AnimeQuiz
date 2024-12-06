var express = require('express');
var router = express.Router();

const categories = [
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Anime & Manga Quiz'});
});

module.exports = router;
