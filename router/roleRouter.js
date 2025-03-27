const express = require("express");
require("express-async-errors");
const router = express.Router();

const { commonValidate } = require("../middleware/expressValidator");
const { roleValidator } = require("../validator/roleValidator");

const roleController = require("../controller/roleController");

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
router.post(
  "",
  commonValidate(roleValidator),
  roleController.addRoleAsync
);

/**
 * @openapi
 * '/api/roles':
 *  get:
 *     tags:
 *     - Role Controller
 *     summary: Get all roles
 *     description: Retrieve a list of all roles in the system
 *     responses:
 *      200:
 *        description: A list of roles
 *      500:
 *        description: Server Error
 */
router.get("", roleController.getAllRolesAsync);

/**
 * @openapi
 * '/api/roles/name/{role_name}':
 *  get:
 *     tags:
 *     - Role Controller
 *     summary: Get role by name
 *     description: Retrieve a specific role using its name
 *     parameters:
 *      - in: path
 *        name: role_name
 *        schema:
 *          type: string
 *        required: true
 *        description: Name of the role
 *     responses:
 *      200:
 *        description: Role found
 *      404:
 *        description: Role not found
 *      500:
 *        description: Server Error
 */
router.get(
  "/name/:role_name", 
  roleController.getRoleByNameAsync
);

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
router.put(
  "/:id",
  commonValidate(roleValidator),
  roleController.updateRoleAsync
);

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
router.delete("/:id", roleController.deleteRoleAsync);


module.exports = router;