const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not Found`);
    error.statusCode = 404;
    next(error);
};

export default notFound;
