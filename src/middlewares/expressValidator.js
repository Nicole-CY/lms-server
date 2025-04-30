const { validationResult } = require('express-validator');

const { BadRequestError } = require('../utils/errors');

const commonValidate = validations => {
    return async (req, res, next) => {
        for (const validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const errorMessages = errors.array().map(error => error.msg);
        return next(new BadRequestError(errorMessages));
    };
};

module.exports = {
    commonValidate,
};
