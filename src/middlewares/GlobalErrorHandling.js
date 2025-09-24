// src/middlewares/GlobalErrorHandling.js

function globalErrorHandler(err, req, res, next) {
    console.error('Global Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            // Optionally include stack trace in development
            ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        },
    });
}

module.exports = globalErrorHandler;