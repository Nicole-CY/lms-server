const express = require('express');
require('express-async-errors');
const router = express.Router();
const { body, param, query } = require('express-validator');

const { commonValidate } = require('../middleware/expressValidator');
const permissionController = require('../controller/permissionController');

/**
 * @openapi
 * '/api/permissions':
 *  post:
 *     tags:
 *       - Permission Controller
 *     summary: Add a permission
 *     description: add Permission
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *                default: UPDATE_USER
 *              description:
 *                type: string
 *                default: Update user data
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
    commonValidate([body('name').notEmpty().withMessage('Permission name is required')]),
    permissionController.addPermissionAsync
);

/**
 * @openapi
 * '/api/permissions':
 *  get:
 *     tags:
 *       - Permission Controller
 *     summary: Get paginated permission list
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: The number of sessions per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
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
router.get(
    '/',
    commonValidate([
        query('page').notEmpty().isInt({ min: 1 }),
        query('pageSize').notEmpty().isInt({ min: 1 }),
    ]),
    permissionController.getPermissionListAsync
);

/**
 * @openapi
 * '/api/permissions':
 *  put:
 *     tags:
 *     - Permission Controller
 *     summary: Update permission
 *     description: update permission
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *              - description
 *            properties:
 *              id:
 *                type: number
 *                default: 1
 *              name:
 *                type: string
 *                default: test
 *              description:
 *                type: string
 *                default: test
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
router.put(
    '',
    commonValidate([
        body('id').notEmpty().isInt({ min: 1 }),
        body('name').notEmpty().withMessage('Permission name is required'),
    ]),
    permissionController.updatePermissionAsync
);

/**
 * @openapi
 * '/api/permissions/getPermissionById':
 *  get:
 *     tags:
 *     - Permission Controller
 *     summary: Get permission by ID
 *     parameters:
 *      - name: id
 *        in: query
 *        description: The id of the user
 *        required: true
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
router.get(
    '/getPermissionById',
    commonValidate([query('id').notEmpty().isInt({ min: 1 }).withMessage('Valid ID required')]),
    permissionController.getPermissionByIdAsync
);

module.exports = router;
