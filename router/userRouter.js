const express = require("express");
require("express-async-errors");
const router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");
const userController = require("../controller/userController");

/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *       - User Controller
 *     summary: Add user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                example: demo@example.com
 *              password:
 *                type: string
 *                example: 123456
 *              firstName:
 *                type: string
 *                example: John
 *              lastName:
 *                type: string
 *                example: Doe
 *              gender:
 *                type: number
 *                example: 1
 *              address:
 *                type: string
 *                example: Sydney
 *              birthDate:
 *                type: string
 *                format: date
 *                example: 1990-01-01
 *              avatar:
 *                type: string
 *                example: http://example.com/avatar.png
 *              roles:
 *                type: array
 *                items:
 *                  type: string
 *                example: ["admin", "user"]
 *              active:
 *                type: boolean
 *                example: true
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post(
    "",
    commonValidate([
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isString()
            .isLength({ min: 6 })
            .withMessage("Password too short"),
        body("firstName").optional().isString(),
        body("lastName").optional().isString(),
        body("gender").optional().isInt(),
        body("address").optional().isString(),
        body("birthDate").optional().isISO8601().toDate(),
        body("avatar").optional().isString(),
        body("roles").optional().isArray(),
        body("active").optional().isBoolean(),
    ]),
    userController.addUserAsync
);

/**
 * @openapi
 * '/api/users':
 *  put:
 *     tags:
 *     - User Controller
 *     summary: Update user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: number
 *                example: 1
 *              email:
 *                type: string
 *                example: updated@example.com
 *              password:
 *                type: string
 *                example: newpassword123
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              gender:
 *                type: number
 *              address:
 *                type: string
 *              birthDate:
 *                type: string
 *                format: date
 *              avatar:
 *                type: string
 *              roles:
 *                type: array
 *                items:
 *                  type: string
 *              active:
 *                type: boolean
 *     responses:
 *      200:
 *        description: Updated successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.put(
    "",
    commonValidate([
        body("id").notEmpty().isInt().withMessage("User ID is required"),
        body("email").optional().isEmail(),
        body("password").optional().isString().isLength({ min: 6 }),
        body("firstName").optional().isString(),
        body("lastName").optional().isString(),
        body("gender").optional().isInt(),
        body("address").optional().isString(),
        body("birthDate").optional().isISO8601().toDate(),
        body("avatar").optional().isString(),
        body("roles").optional().isArray(),
        body("active").optional().isBoolean(),
    ]),
    userController.updateUserAsync
);

/**
 * @openapi
 * '/api/users/getUser':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get user by query id
 *     parameters:
 *      - name: id
 *        in: query
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Fetched successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.get(
    "/getUser",
    commonValidate([
        query("id").notEmpty().isInt().withMessage("User ID is required"),
    ]),
    userController.getUserAsync
);

/**
 * @openapi
 * '/api/users/getUserById':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get user by ID (query)
 *     parameters:
 *      - name: id
 *        in: query
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 */
router.get(
    "/getUserById",
    commonValidate([
        query("id").notEmpty().isInt().withMessage("User ID is required"),
    ]),
    userController.getUserByIdAsync
);

/**
 * @openapi
 * '/api/users/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get paginated user list
 *     parameters:
 *      - name: page
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *      - name: pageSize
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 */
router.get(
    "/:page/:pageSize",
    commonValidate([
        param("page")
            .notEmpty()
            .isInt({ min: 1 })
            .withMessage("Invalid page number"),
        param("pageSize")
            .notEmpty()
            .isInt({ min: 1 })
            .withMessage("Invalid page size"),
    ]),
    userController.getUserListAsync
);

/**
 * @openapi
 * '/api/users/{ids}':
 *  delete:
 *     tags:
 *     - User Controller
 *     summary: Delete user by ID(s)
 *     parameters:
 *      - name: ids
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Deleted successfully
 *      400:
 *        description: Bad Request
 */
router.delete(
    "/:ids",
    commonValidate([
        param("ids").notEmpty().withMessage("User ID(s) required"),
    ]),
    userController.deUserByIdAsync
);

module.exports = router;
