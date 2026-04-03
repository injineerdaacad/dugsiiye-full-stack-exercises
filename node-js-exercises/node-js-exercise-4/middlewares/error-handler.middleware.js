const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500;

    const response = {
        success: false,
        message: error.message || "Something went wrong",
        status,
    };

    if (error.errors) {
        response.errors = error.errors;
    }

    if (error.details) {
        response.details = error.details;
    }

    res.status(status).json(response);
};

export default errorHandler;
