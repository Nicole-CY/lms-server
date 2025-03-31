const express = require("express");
require("express-async-errors");
const router = express.Router();

const { commonValidate } = require("../middleware/expressValidator");
const {getCategoryByNameValidator,
  getCategoryListValidator,
  addCategoryValidator,
  deleteCategoryByIdValidator,
  getCategoryByIdValidator,
  updateCategoryByIdValidator,
  updateCategoryByNameValidator, } = require("../validator/categoryValidator")

const categoryController = require("../controller/Course/categoryController");
  
/**
 * @openapi
 * '/api/categories/getCategory':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get a category by name
 *     parameters:
 *      - name: categoryName
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
  commonValidate(getCategoryByNameValidator),
  categoryController.getCategoryByNameAsync
);

/**
 * @openapi
 * '/api/categories':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get all categories
 *     parameters:
 *       - name: page
 *         in: query
 *         description: page
 *         required: true
 *       - name: pageSize
 *         in: query
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
  "/",
  commonValidate(getCategoryListValidator),
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
 *              - categoryName
 *              - description
 *              - parentId
 *              - createdAt
 *              - updatedAt
 *              - createdBy
 *              - updatedBy
 *              - iconUrl
 *            properties:
 *              categoryName:
 *                type: string
 *                example: Electronics
 *              description:
 *                type: string
 *                example: Category for electronic items
 *              parentId:
 *                type: integer
 *                example: 1
 *              createdBy:
 *                type: integer
 *                example: 1
 *              updatedBy:
 *                type: integer
 *                example: 1
 *              iconUrl:
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
  commonValidate(addCategoryValidator),
  categoryController.addCategoryAsync
);

/**
 * @openapi
 * '/api/categories/{id}':
 *  delete:
 *     tags:
 *     - Category Controller
 *     summary: Delete a category by Id
 *     parameters:
 *      - name: id
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
  "/:id",
  commonValidate(deleteCategoryByIdValidator),
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
  commonValidate(getCategoryByIdValidator),
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
 *              - categoryName
 *              - description
 *              - parentId
 *              - createdAt
 *              - updatedAt
 *              - createdBy
 *              - updatedBy
 *              - iconUrl
 *            properties:
 *              categoryName:
 *                type: string
 *                example: Electronics
 *              description:
 *                type: string
 *                example: Category for electronic items
 *              parentId:
 *                type: integer
 *                example: 1
 *              createdBy:
 *                type: integer
 *                example: 1
 *              updatedBy:
 *                type: integer
 *                example: 1
 *              iconUrl:
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
  commonValidate(updateCategoryByIdValidator),
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
 *              - categoryName
 *              - description
 *              - parentId
 *              - createdAt
 *              - updatedAt
 *              - createdBy
 *              - updatedBy
 *              - iconUrl
 *            properties:
 *              categoryName:
 *                type: string
 *                example: Electronics
 *              description:
 *                type: string
 *                example: Category for electronic items
 *              parentId:
 *                type: integer
 *                example: 1
 *              createdBy:
 *                type: integer
 *                example: 1
 *              updatedBy:
 *                type: integer
 *                example: 1
 *              iconUrl:
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
  commonValidate(updateCategoryByNameValidator),
  categoryController.updateCategoryByNameAsync
);

/**
 * @openapi
 * '/api/categories/getCategoryTree':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get category tree obj
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
  "/getCategoryTree",
  commonValidate([]),
  categoryController.getCategoryTreeAsync
);

module.exports = router;
