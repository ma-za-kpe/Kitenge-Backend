//@desc Logs response to console
var logger = require('morgan');

logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next();
}

module.exports = logger;