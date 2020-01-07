const errorHandler = (err, req, res, next) => {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //get custome errors
    let error = {
        ...err
    }
    error.message = err.message

    // mongoose bab object id
    //mongoose bad objectid
    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id of ${err.value}`
        error = new errorHandler(message || 404)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server error'
    })

}

module.exports = errorHandler;