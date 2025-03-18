const express = require("express");
require("express-async-errors");
const router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

const categoryController = require("../controller/Course/categoryController");

/**
 * @openapi
 * '/api/categories/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get all categories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: path
 *         description: page
 *         required: true
 *       - name: pageSize
 *         in: path
 *         description: pageSize
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
router.get(
  "/:page/:pageSize",
  commonValidate([
    param("page")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false, min: 1 })
      .withMessage("Not a valid page"),
    param("pageSize")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false, min: 1 })
      .withMessage("Not a valid page"),
  ]),
  categoryController.getCategoryListAsync
);

/**
 * @openapi
 * '/api/categories':
 *  post:
 *     tags:
 *     - Category Controller
 *     summary: Add a category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - CategoryName
 *              - Description
 *              - ParentId
 *              - createdAt
 *              - updatedAt
 *              - Created_By
 *              - Updated_By
 *              - IconUrl
 *            properties:
 *              CategoryName:
 *                type: string
 *                example: Electronics
 *              Description:
 *                type: string
 *                example: Category for electronic items
 *              ParentId:
 *                type: integer
 *                example: 1
 *              Created_By:
 *                type: integer
 *                example: 1
 *              Updated_By:
 *                type: integer
 *                example: 1
 *              IconUrl:
 *                type: string
 *                example: "https://example.com/icon.png"
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
  "/",
  commonValidate([
    body("CategoryName").notEmpty().withMessage("CategoryName is required"),
    body("Description").notEmpty().withMessage("Description is required"),
    body("ParentId")
      .optional()
      .isInt()
      .withMessage("ParentId must be a string"),
    body("Created_By").notEmpty().withMessage("Created_By is required"),
    body("Updated_By").notEmpty().withMessage("Updated_By is required"),
    body("IconUrl")
      .optional()
      .isURL()
      .withMessage("IconUrl must be a valid URL"),
  ]),
  categoryController.addCategoryAsync
);

/**
 * @openapi
 * '/api/categories/{ids}':
 *  delete:
 *     tags:
 *     - Category Controller
 *     summary: delete a category by Id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: ids
 *        in: path
 *        description: The id of the category
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
router.delete(
  "/:ids",
  param([param("ids").notEmpty().withMessage("Not a valid id")]),
  categoryController.deleteCategoryByIdAsync
);

module.exports = router;
