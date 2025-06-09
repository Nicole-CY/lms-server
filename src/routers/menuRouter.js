const express = require('express');
require('express-async-errors');
const router = express.Router();

const { commonValidate } = require('../middlewares/expressValidator');
const {
    getMenuListValidator,
    getMenuByIdValidator,
    getMenuByNameValidator,
    addMenuValidator,
    updateMenuByIdValidator,
    deleteMenuByIdValidator,
} = require('../validator/menuValidator');
const menuController = require('../controllers/menuController');
const setUserFromToken = require('../middlewares/setUserFromToken');

/**
 * @openapi
 * '/api/menus':
 *  get:
 *     tags:
 *     - Menu Controller
 *     summary: Get paginated list of menus
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *       - name: pageSize
 *         in: query
 *         required: true
 *       - name: search
 *         in: query
 *         required: false
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
router.get('/', commonValidate(getMenuListValidator), menuController.getMenuListAsync);

/**
 * @openapi
 * '/api/menus/getMenuById':
 *  get:
 *     tags:
 *     - Menu Controller
 *     summary: Get menu by ID
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
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
router.get('/getMenuById', commonValidate(getMenuByIdValidator), menuController.getMenuByIdAsync);

/**
 * @openapi
 * '/api/menus/getMenu':
 *  get:
 *     tags:
 *     - Menu Controller
 *     summary: Get a menu by name
 *     parameters:
 *      - name: menuName
 *        in: query
 *        description: Name of the menu to retrieve
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
router.get('/getMenu', commonValidate(getMenuByNameValidator), menuController.getMenuByNameAsync);

/**
 * @openapi
 * '/api/menus':
 *  post:
 *     tags:
 *     - Menu Controller
 *     summary: Add a new menu
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
 *              icon:
 *                type: string
 *                example: dashboard
 *                description: Icon name used in the frontend menu
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
router.post('/', commonValidate(addMenuValidator), menuController.addMenuAsync);

/**
 * @openapi
 * '/api/menus/{id}':
 *  put:
 *     tags:
 *     - Menu Controller
 *     summary: Update menu by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *                enum: [page, subMenu, menuItem, button]
 *                example: page
 *              sortOrder:
 *                type: integer
 *                example: 1
 *              permission:
 *                type: string
 *                example: menu:dashboard
 *              icon:
 *                type: string
 *                example: dashboard
 *                description: Icon name used in the frontend menu
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
router.put('/:id', commonValidate(updateMenuByIdValidator), menuController.updateMenuByIdAsync);

/**
 * @openapi
 * '/api/menus/{id}':
 *  delete:
 *     tags:
 *     - Menu Controller
 *     summary: Delete menu (including its children)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the menu
 *         required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.delete('/:id', commonValidate(deleteMenuByIdValidator), menuController.deleteMenuByIdAsync);

/**
 * @openapi
 * '/api/menus/getMenuTree':
 *  get:
 *     tags:
 *     - Menu Controller
 *     summary: Get full menu tree
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.get('/getMenuTree', commonValidate([]), menuController.getMenuTreeAsync);

/**
 * @openapi
 * '/api/menus/by-role':
 *  get:
 *     tags:
 *     - Menu Controller
 *     summary: Get menu list by current user's role
 *     description: Returns menu tree based on user's assigned role
 *     security:
 *       - BearerAuth: []
 *     responses:
 *      200:
 *        description: Successfully retrieved role-based menu
 *      400:
 *        description: Missing role
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */
router.get(
    '/by-role',
    setUserFromToken, // extract user from JWT, sets req.user
    menuController.getMenuByRoleAsync
);

module.exports = router;
