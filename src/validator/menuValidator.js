const { body, query, param } = require('express-validator');

// Get menu list
const getMenuListValidator = [
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
    query('search')
        .optional()
        .isString()
        .withMessage('Search must be a string')
        .isLength({ max: 50 })
        .withMessage('Search query must not exceed 50 characters'),
];

// Get menu by id
const getMenuByIdValidator = [
    query('id')
        .notEmpty()
        .withMessage('Menu ID is required')
        .isInt({ min: 1 })
        .withMessage('Menu ID must be a valid positive integer'),
];

// Get menu by name
const getMenuByNameValidator = [
    query('menuName')
        .notEmpty()
        .withMessage('Menu name is required')
        .isString()
        .withMessage('Menu name must be a string')
        .isLength({ max: 50 })
        .withMessage('Menu name must not exceed 50 characters'),
];

// Add menu
const addMenuValidator = [
    body('menuName')
        .notEmpty()
        .withMessage('Menu name is required')
        .isString()
        .withMessage('Menu name must be a string')
        .isLength({ max: 50 })
        .withMessage('Menu name must not exceed 50 characters'),
    body('routePath')
        .notEmpty()
        .withMessage('Route path is required')
        .isString()
        .withMessage('Route path must be a string')
        .isLength({ max: 255 })
        .withMessage('Route path must not exceed 255 characters'),
    body('parentId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Parent ID must be a positive integer'),
    body('componentPath')
        .optional()
        .isString()
        .withMessage('Component path must be a string')
        .isLength({ max: 255 })
        .withMessage('Component path must not exceed 255 characters'),
    body('menuType')
        .optional()
        .isIn(['page', 'button', 'group'])
        .withMessage('Menu type must be one of page, button, or group'),
    body('sortOrder')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Sort order must be a non-negative integer'),
    body('permission')
        .optional()
        .isString()
        .withMessage('Permission must be a string')
        .isLength({ max: 100 })
        .withMessage('Permission must not exceed 100 characters'),
    body('icon')
        .optional()
        .isString()
        .withMessage('Icon must be a string')
        .isLength({ max: 100 })
        .withMessage('Icon must not exceed 100 characters'),
];

// Update menu by id
const updateMenuByIdValidator = [
    query('id')
        .notEmpty()
        .withMessage('Menu ID is required')
        .isInt({ min: 1 })
        .withMessage('Menu ID must be a valid positive integer'),
    body('menuName')
        .optional()
        .isString()
        .withMessage('Menu name must be a string')
        .isLength({ max: 50 })
        .withMessage('Menu name must not exceed 50 characters'),
    body('routePath')
        .optional()
        .isString()
        .withMessage('Route path must be a string')
        .isLength({ max: 255 })
        .withMessage('Route path must not exceed 255 characters'),
    body('parentId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Parent ID must be a positive integer'),
    body('componentPath')
        .optional()
        .isString()
        .withMessage('Component path must be a string')
        .isLength({ max: 255 })
        .withMessage('Component path must not exceed 255 characters'),
    body('menuType')
        .optional()
        .isIn(['page', 'button', 'group'])
        .withMessage('Menu type must be one of page, button, or group'),
    body('sortOrder')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Sort order must be a non-negative integer'),
    body('permission')
        .optional()
        .isString()
        .withMessage('Permission must be a string')
        .isLength({ max: 100 })
        .withMessage('Permission must not exceed 100 characters'),
    body('icon')
        .optional()
        .isString()
        .withMessage('Icon must be a string')
        .isLength({ max: 100 })
        .withMessage('Icon must not exceed 100 characters'),
];

// Delete menu by id
const deleteMenuByIdValidator = [
    param('id')
        .notEmpty()
        .withMessage('Menu ID is required')
        .isInt({ min: 1 })
        .withMessage('Menu ID must be a valid positive integer'),
];

module.exports = {
    getMenuListValidator,
    getMenuByIdValidator,
    getMenuByNameValidator,
    addMenuValidator,
    updateMenuByIdValidator,
    deleteMenuByIdValidator,
};
