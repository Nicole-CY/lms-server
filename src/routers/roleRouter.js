const express = require('express');
require('express-async-errors');
const router = express.Router();

const { commonValidate } = require('../middlewares/expressValidator');
const { roleValidator, roleIdValidator } = require('../validator/roleValidator');
const roleController = require('../controllers/roleController');

/**
 * @openapi
 * '/api/roles':
 *  post:
 *     tags:
 *     - Role Controller
 *     summary: Create a new role
 *     description: Add a new role to the system
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - role_name
 *            properties:
 *              role_name:
 *                type: string
 *                example: Admin
 *              description:
 *                type: string
 *                example: Administrator role with full access
 *     responses:
 *      201:
 *        description: Role created successfully
 *      400:
 *        description: Bad Request
 *      409:
 *        description: Role already exists
 *      500:
 *        description: Server Error
 */
router.post('', commonValidate(roleValidator), roleController.addRoleAsync);

/**
 * @openapi
 * '/api/roles':
 *  get:
 *     tags:
 *     - Role Controller
 *     summary: Get paginated roles
 *     description: Retrieve a paginated list of roles with optional keyword filtering
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (starts from 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword for role name or description
 *     responses:
 *       200:
 *         description: A paginated list of roles
 *       500:
 *         description: Server Error
 */
router.get('', roleController.getAllRolesAsync);

/**
 * @openapi
 * '/api/roles/{id}':
 *  get:
 *     tags:
 *     - Role Controller
 *     summary: Get role by id
 *     description: Retrieve a specific role using its id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Id of the role
 *     responses:
 *      200:
 *        description: Role found
 *      404:
 *        description: Role not found
 *      500:
 *        description: Server Error
 */
router.get('/:id', commonValidate(roleIdValidator), roleController.getRoleByIdAsync);

/**
 * @openapi
 * '/api/roles/{id}':
 *  put:
 *     tags:
 *     - Role Controller
 *     summary: Update a role
 *     description: Update a role's name or description
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the role to update
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              role_name:
 *                type: string
 *                example: Manager
 *              description:
 *                type: string
 *                example: Role with management permissions
 *     responses:
 *      200:
 *        description: Role updated successfully
 *      400:
 *        description: Invalid request
 *      404:
 *        description: Role not found
 *      500:
 *        description: Server Error
 */
router.put('/:id', commonValidate(roleIdValidator), roleController.updateRoleAsync);

/**
 * @openapi
 * '/api/roles/{id}':
 *  delete:
 *     tags:
 *     - Role Controller
 *     summary: Delete a role by ID
 *     description: Delete a role using its unique ID
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID of the role to delete
 *     responses:
 *      200:
 *        description: Role deleted successfully
 *      404:
 *        description: Role not found
 *      500:
 *        description: Server Error
 */
router.delete('/:ids', roleController.deleteRoleAsync);

/**
 * @openapi
 * '/api/roles/assign':
 *  post:
 *     tags:
 *     - Role Controller
 *     summary: Assign roles to a user
 *     description: Assign one or more roles to a user without removing existing roles. Only Admin or SuperAdmin can perform this operation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleIds
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID of the user to assign roles to
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of role IDs to assign
 *     responses:
 *       200:
 *         description: Roles assigned successfully
 *       400:
 *         description: Invalid user ID or role IDs
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Server Error
 */
router.post('/assign', roleController.assignRolesToUserAsync);

/**
 * @openapi
 * '/api/roles/assign-menus':
 *  post:
 *     tags:
 *     - Role Controller
 *     summary: Assign menus to a role
 *     description: Assign one or more menus to a role. Only SuperAdmin can perform this operation. Existing menu assignments will be overwritten.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - menuIds
 *             properties:
 *               roleId:
 *                 type: integer
 *                 description: ID of the role to assign menus to
 *               menuIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of menu IDs to assign
 *     responses:
 *       200:
 *         description: Menus assigned successfully
 *       400:
 *         description: Invalid role ID or menu IDs
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Server Error
 */
router.post('/assign-menus', roleController.assignMenusToRoleAsync);

module.exports = router;
