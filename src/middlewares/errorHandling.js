const logger = require('../common/logSetting');
const {
    AppError,
    ForbiddenError,
    BadRequestError,
    BusinessError,
    UnauthorizedError,
} = require('../utils/errors');

/**
 * Global error handling middleware for Express.js.
 * Handles errors from Express, Sequelize, and custom errors.
 *
 * @param {Error} err - The error thrown by previous middleware or route handler.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const errorHandling = (err, req, res, next) => {
    logger.error('Global Error Handler:', err);

    // Handle Sequelize errors (validation, unique constraint, foreign key constraint)
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

    // Handle custom BusinessError
    if (err instanceof BusinessError) {
        return res.sendCommonValue({}, err.message, err.statusCode, err.statusCode);
    }

    // Handle ForbiddenError (custom error)
    if (err instanceof ForbiddenError) {
        return res.sendCommonValue({}, err.message, err.statusCode, err.statusCode);
    }

    // Handle BadRequestError (custom error)
    if (err instanceof BadRequestError) {
        return res.sendCommonValue({}, err.message, err.statusCode, err.statusCode);
    }

    // Handle UnauthorizedError (custom error)
    if (err instanceof UnauthorizedError) {
        const reason = err.inner?.name;
        if (reason === 'TokenExpiredError') {
            return res.sendCommonValue({}, 'Login expired. Please login again.', 401, 401);
        }
        return res.sendCommonValue({}, err.message || 'Unauthorized. Login Required', 401, 401);
    }

    if (err.name == 'UnauthorizedError') {
        const reason = err.inner?.name;
        if (reason === 'TokenExpiredError') {
            return res.sendCommonValue({}, 'Login expired. Please login again.', 401, 401);
        }
        return res.sendCommonValue({}, err.message || 'Unauthorized. Login Required', 401, 401);
    }

    // Handle other custom errors if necessary (can be extended)
    if (err.isOperational) {
        return res.sendCommonValue(
            {},
            err.message || 'An operational error occurred.',
            err.statusCode,
            err.statusCode
        );
    }

    // Handle generic Express errors
    return res.sendCommonValue({}, 'Unexpected server error.', 500, 500);
};

module.exports = {
    errorHandling,
};
