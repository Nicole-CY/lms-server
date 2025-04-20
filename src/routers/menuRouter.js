const express = require('express');
require('express-async-errors');
const router = express.Router();

const { body, query, param } = require('express-validator');

const { commonValidate } = require('../middlewares/expressValidator');
const menuController = require('../controllers/menuController');

/**
 * @openapi
 * '/api/menus':
 *  post:
 *     tags:
 *     - Menu Controller
 *     summary: Create a new menu
 *     description: Add a new menu item
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - menuName
 *              - routePath
 *            properties:
 *              menuName:
 *                type: string
 *                default: Dashboard
 *              parentId:
 *                type: integer
 *                nullable: true
 *                default: null
 *              routePath:
 *                type: string
 *                default: /dashboard
 *              componentPath:
 *                type: string
 *                example: Dashboard
 *              menuType:
 *                type: string
 *                enum: [page, group, link, button]
 *                example: page
 *              sortOrder:
 *                type: integer
 *                example: 1
 *              permission:
 *                type: string
 *                example: menu:dashboard
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post(
    '',
    commonValidate([
        body('menuName').notEmpty().withMessage('Menu name is required'),
        body('routePath').notEmpty().withMessage('Route path is required'),
        body('parentId').optional().isInt().withMessage('Parent ID must be an integer'),
        body('componentPath').optional().isString(),
        body('menuType')
            .optional()
            .isIn(['page', 'group', 'link', 'button'])
            .withMessage('Invalid menu type'),
        body('sortOrder')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Sort order must be a non-negative integer'),
        body('permission').optional().isString(),
    ]),
    menuController.createMenuAsync
);

/**
 * @openapi
 * '/api/menus':
 *  get:
 *     tags:
 *     - Menu Controller
 *     summary: Get all menus
 *     security:
 *       - BearerAuth: []
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get('', menuController.getMenuAsync);

module.exports = router;
