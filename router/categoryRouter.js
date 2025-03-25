const express = require("express");
require("express-async-errors");
const router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");
const categoryController = require("../controller/Course/categoryController");

/**
 * @openapi
 * '/api/categories/getCategory':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get a category by name
 *     parameters:
 *      - name: category_name
 *        in: query
 *        description: Name of the category to retrieve
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
  "/getCategory",
  commonValidate([
    query("categoryname").notEmpty().withMessage("Category name is required"),
  ]),
  categoryController.getCategoryByNameAsync
);

/**
 * @openapi
 * '/api/categories/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get all categories
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
      .withMessage("Not a valid page size"),
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
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - category_name
 *              - description
 *              - parent_id
 *              - created_at
 *              - updated_at
 *              - created_by
 *              - updated_by
 *              - icon_url
 *            properties:
 *              category_name:
 *                type: string
 *                example: Electronics
 *              description:
 *                type: string
 *                example: Category for electronic items
 *              parent_id:
 *                type: integer
 *                example: 1
 *              created_by:
 *                type: integer
 *                example: 1
 *              updated_by:
 *                type: integer
 *                example: 1
 *              icon_url:
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
    body("categoryName").notEmpty().withMessage("category name is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("parentId")
      .optional()
      .isInt()
      .withMessage("parentId must be an integer"),
    body("iconUrl")
      .optional()
      .isURL()
      .withMessage("iconUrl must be a valid URL"),  
  ]),
  categoryController.addCategoryAsync
);

/**
 * @openapi
 * '/api/categories/{ids}':
 *  delete:
 *     tags:
 *     - Category Controller
 *     summary: Delete a category by Id
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

/**
 * @openapi
 * '/api/categories/getCategoriesById':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get a category by id
 *     parameters:
 *      - name: id
 *        in: query
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
router.get(
  "/getCategoriesById",
  commonValidate([query("id").notEmpty().withMessage("Not a valid id")]),
  categoryController.getCategoryByIdAsync
);

/**
 * @openapi
 * '/api/categories/updateCategoriesById':
 *  put:
 *     tags:
 *     - Category Controller
 *     summary: update a category by id
 *     parameters:
 *      - name: id
 *        in: query
 *        description: The id of the category
 *        required: true
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - category_name
 *              - description
 *              - parent_id
 *              - created_at
 *              - updated_at
 *              - created_by
 *              - updated_by
 *              - icon_url
 *            properties:
 *              category_name:
 *                type: string
 *                example: Electronics
 *              description:
 *                type: string
 *                example: Category for electronic items
 *              parent_id:
 *                type: integer
 *                example: 1
 *              created_by:
 *                type: integer
 *                example: 1
 *              updated_by:
 *                type: integer
 *                example: 1
 *              icon_url:
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
router.put(
  "/updateCategoriesById",
  commonValidate([query("id").notEmpty().withMessage("Not a valid id")]),
  categoryController.updateCategoryByIdAsync
);

/**
 * @openapi
 * '/api/categories/updateCategoriesByName':
 *  put:
 *     tags:
 *     - Category Controller
 *     summary: update a category by name
 *     parameters:
 *      - name: name
 *        in: query
 *        description: The name of the category
 *        required: true
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - category_name
 *              - description
 *              - parent_id
 *              - created_at
 *              - updated_at
 *              - created_by
 *              - updated_by
 *              - icon_url
 *            properties:
 *              category_name:
 *                type: string
 *                example: Electronics
 *              description:
 *                type: string
 *                example: Category for electronic items
 *              parent_id:
 *                type: integer
 *                example: 1
 *              created_by:
 *                type: integer
 *                example: 1
 *              updated_by:
 *                type: integer
 *                example: 1
 *              icon_url:
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
router.put(
  "/updateCategoriesByName",
  commonValidate([
    body("categoryName").notEmpty().withMessage("Not a valid categoryName"),
  ]),
  categoryController.updateCategoryByNameAsync
);

module.exports = router;
