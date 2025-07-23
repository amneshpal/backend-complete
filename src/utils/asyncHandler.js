const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);       
    } catch (error) {
        res.status(error.code || 500).json({
            success: false, 
            message: error.message || 'Internal Server Error',
            error: error.stack || 'No stack trace available'
        });
        next(error);  // Forward the error to a global error handler
    }
};
