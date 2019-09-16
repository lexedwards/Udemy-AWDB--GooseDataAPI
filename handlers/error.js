errorHandler = (error, request, response, next) => {
    return response.status(error.status || 500).json({
        error: {
            message: error.message || 'Oops! Something unhandled went wrong.'
        }
    });
}

module.exports = errorHandler;