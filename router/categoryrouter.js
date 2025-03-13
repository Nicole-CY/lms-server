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

module.exports = router;
