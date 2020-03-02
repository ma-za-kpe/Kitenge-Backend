var express = require('express');
var router = express.Router();

/* GET developer page. */
router.get('/', function (req, res, next) {
    res.render('vendor', {
        title: 'Vendors'
    });
});

module.exports = router;