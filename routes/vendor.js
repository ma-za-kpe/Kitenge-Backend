var express = require('express');
var router = express.Router();

/* GET developer page. */
router.get('/', function (req, res, next) {
    res.render('vendor', {
        title: 'Vendors'
    });
});

router.get('/register', function (req, res, next) {
    res.render('registerVendor', {
        title: 'register'
    });
});

module.exports = router;