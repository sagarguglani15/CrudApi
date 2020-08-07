var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('CRUD API', { title: 'by SAGAR GUGLANI' });
});

module.exports = router;
