const ErrorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.log(statusCode);
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'producetion' ? '🙈 🙈 🙈' : error.stack
    })
};

const NotFound = (req, res, next) => {
    const error = new Error(`😭 😭 😭 Page Not Found = ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = {
    NotFound,
    ErrorHandler
}