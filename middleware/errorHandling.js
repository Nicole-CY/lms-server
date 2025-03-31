const logger = require('../common/logSetting');

/**
 * Global error handling middleware for Express.js.
 * Catches various types of known errors and responds with standardized messages.
 * Ensures sensitive error details are not exposed to the client.
 *
 * @param {Error} err - The error thrown by previous middleware or route handler.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const errorHandling = (err, req, res, next) => {
    logger.error('Global Error Handler:', err);

    // JWT Authentication Errors (e.g., invalid or expired token)
    if (err.name === 'UnauthorizedError') {
        const reason = err.inner?.name;
        if (reason === 'TokenExpiredError') {
            return res.sendCommonValue({}, 'Login expired. Please login again.', 401, 401);
        }
        return res.sendCommonValue({}, 'Unauthorized. Login Required', 401, 401);
    }

    // Sequelize ORM Errors
    if (err.name?.startsWith('Sequelize')) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.sendCommonValue({}, 'Duplicate data. Operation not allowed.', 400, 400);
        }

        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return res.sendCommonValue({}, 'Invalid reference or missing related data.', 400, 400);
        }

        if (err.name === 'SequelizeValidationError') {
            const messages = err.errors.map(e => e.message).join('; ');
            return res.sendCommonValue({}, `Validation failed: ${messages}`, 400, 400);
        }

        return res.sendCommonValue({}, 'Database operation failed.', 500, 500);
    }

    // Client input validation or bad request
    if (err.name === 'BadRequestError') {
        return res.sendCommonValue({}, err.message || 'Invalid request.', 400, 400);
    }

    // Forbidden access (authorization failure)
    if (err.name === 'ForbiddenError') {
        return res.sendCommonValue({}, err.message || 'Access denied.', 403, 403);
    }

    // Custom business logic errors
    if (err.isBusinessError) {
        return res.sendCommonValue(
            {},
            err.message || 'Business logic error.',
            err.statusCode || 400,
            err.statusCode || 400
        );
    }

    // Rate limit error
    if (err.name === 'RateLimitError') {
        return res.sendCommonValue({}, 'Too many requests. Please try again later.', 429, 429);
    }

    // Raw SQL error fallback (avoid leaking internal details)
    if (err && err.sql) {
        return res.sendCommonValue({}, 'Internal server error.', 500, 500);
    }

    // Unhandled/unknown errors (generic fallback)
    return res.sendCommonValue({}, 'Unexpected server error.', 500, 500);
};

module.exports = {
    errorHandling,
};
