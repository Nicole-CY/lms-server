const express = require("express");
require("express-async-errors");
const router = express.Router();

const { commonValidate } = require("../middleware/expressValidator");
const { roleValidator } = require("../validator/roleValidator");

var roleController = require("../controller/roleController");

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

module.exports = router;