/**
 * Middleware to attach a unified response method to the response object.
 * Adds `res.sendCommonValue()` for consistent API response formatting.
 *
 * Usage:
 * In your Router Handler, use `res.sendCommonValue(data, message, StatusCode, HttpStatusCode)`
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const returnValue = (req, res, next) => {
    /**
     * @param {any} data - The data to return in the response.
     * @param {string|Error} message - Success or error message. If Error, extracts message.
     * @param {number} [status=0] - Application-level status code (not HTTP status).
     * @param {number} [httpStatus=200] - HTTP status code to send.
     */
    res.sendCommonValue = function (data, message, status = 0, httpStatus = 200) {
        if (typeof httpStatus !== 'undefined') {
            res.status(httpStatus).json({
                status,
                data,
                message: message instanceof Error ? message.message : message,
            });
        } else {
            res.json({
                status,
                data,
                message: message instanceof Error ? message.message : message,
            });
        }
    };

    next();
};

module.exports = {
    returnValue,
};
