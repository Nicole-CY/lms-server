const { body, query, param, path } = require('express-validator');

const getCategoryByNameValidator = [
    query('categoryName')
        .notEmpty()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ max: 50 })
        .withMessage('Category name must not exceed 50 characters'),
];

const getCategoryListValidator = [
    query('page')
        .notEmpty()
        .withMessage('Page is required')
        .isInt({ allow_leading_zeroes: false, min: 1 })
        .withMessage('Page must be a positive integer'),
    query('pageSize')
        .notEmpty()
        .withMessage('Page size is required')
        .isInt({ allow_leading_zeroes: false, min: 1 })
        .withMessage('Page size must be a positive integer'),
];

const addCategoryValidator = [
    body('categoryName')
        .notEmpty()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ max: 50 })
        .withMessage('Category name must not exceed 50 characters'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string')
        .isLength({ max: 255 })
        .withMessage('Description must not exceed 255 characters'),
    body('parentId')
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage('Parent ID must be a positive integer'),
    body('iconUrl')
        .isURL()
        .withMessage('Icon URL must be a valid URL')
        .isLength({ max: 255 })
        .withMessage('Icon URL must not exceed 255 characters')
        .optional({ checkFalsy: true, nullable: true }),
];

const deleteCategoryByIdValidator = [
    param('id')
        .notEmpty()
        .withMessage('Category ID is required')
        .isInt({ min: 1 })
        .withMessage('Category ID must be a valid integer'),
];

const getCategoryByIdValidator = [
    query('id')
        .notEmpty()
        .withMessage('Category ID is required')
        .isInt({ min: 1 })
        .withMessage('Category ID must be a valid integer'),
];

const updateCategoryByIdValidator = [
    query('id')
        .notEmpty()
        .withMessage('Category ID is required')
        .isInt({ min: 1 })
        .withMessage('Category ID must be a valid integer'),
    body('categoryName')
        .optional()
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ max: 50 })
        .withMessage('Category name must not exceed 50 characters'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .isLength({ max: 255 })
        .withMessage('Description must not exceed 255 characters'),
    body('parentId').optional().isInt({ min: 1 }).withMessage('Parent ID must be a valid integer'),
    body('iconUrl')
        .optional()
        .isURL()
        .withMessage('Icon URL must be a valid URL')
        .isLength({ max: 255 })
        .withMessage('Icon URL must not exceed 255 characters'),
];

const updateCategoryByNameValidator = [
    body('categoryName')
        .notEmpty()
        .withMessage('Category name is required')
        .isString()
        .withMessage('Category name must be a string')
        .isLength({ max: 50 })
        .withMessage('Category name must not exceed 50 characters'),
];

module.exports = {
    getCategoryByNameValidator,
    getCategoryListValidator,
    addCategoryValidator,
    deleteCategoryByIdValidator,
    getCategoryByIdValidator,
    updateCategoryByIdValidator,
    updateCategoryByNameValidator,
};
