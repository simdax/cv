var express = require('express');
var router = express.Router();

const fs = require('fs');

// var f;
// fs.readFile('public/textes/chap1/1.md', function (files, err) {
// 	f=files
// })

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.send(f);
  res.render('index', { title: 'Express' });
});

module.exports = router;
