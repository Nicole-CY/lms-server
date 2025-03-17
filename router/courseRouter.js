const express = require("express");
require("express-async-errors");
const router = express.Router();
const {body, query, param} = require("express-validator");
const {commonValidate} = require("../middleware/expressValidator"); 
const courseController = require("../controller/Course/courseController");

/**
 * @openapi
 * '/api/courses':
 *  post:
 *     tags:
 *     - Course Controller
 *     summary: add course
 *     description: add course
 *     # security:
 *     #   - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - courseCode
 *            properties:
 *              title:
 *                type: string
 *                default: "Introduction to Node.js"
 *              courseCode:
 *                type: string
 *                default: "NODE101"
 *              coverImage:
 *                type: string
 *                default: "nodejs.png"
 *              description:
 *                type: string
 *                default: "Learn the basics of Node.js"
 *              categories:
 *                type: array
 *                items:
 *                  type: integer
 *                description: "An array of category IDs associated with the course"
 *     responses:
 *      201:
 *        description: Course created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                courseCode:
 *                  type: string
 *                coverImage:
 *                  type: string
 *                description:
 *                  type: string
 *                createdAt:
 *                  type: string
 *                  format: date-time
 *                updatedAt:
 *                  type: string
 *                  format: date-time
 *                createdBy:
 *                  type: integer
 *                updatedBy:
 *                  type: integer
 *                categories:
 *                  type: array
 *                  items:
 *                    type: integer
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post("",
    commonValidate([
        body("title").notEmpty().withMessage("title is required"),
        body("courseCode").notEmpty().withMessage("courseCode is required"),
    ]),
    courseController.addCourseAsync
);

module.exports = router;

