var express = require('express');
var router = express.Router();

 const https = require('https')
 const url = 'https://jsonplaceholder.typicode.com/posts/1'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('momo', {
    title: 'momo'
  });
});

/* GET home page. */
router.get('/userdata', function (req, res, next) {
  console.log(res)
});


module.exports = router;