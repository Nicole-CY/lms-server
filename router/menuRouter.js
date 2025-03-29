var express = require("express");
require("express-async-errors");
var router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

const menuController = require("../controller/menuController");

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
  "",
  commonValidate([
    body("menuName").notEmpty().withMessage("Menu name is required"),
    body("routePath").notEmpty().withMessage("Route path is required"),
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
router.get("", menuController.getMenuAsync);

module.exports = router;
