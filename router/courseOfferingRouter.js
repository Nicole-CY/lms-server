

const express = require("express");
require("express-async-errors");
const router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

const courseOfferingController = require("../controller/Course/courseOfferingController");

/**
 * @openapi
 * '/api/courseOfferings/list/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - CourseOffering
 *     summary: Get course offering list (optional search)
 *     parameters:
 *       - name: page
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: pageSize
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched successfully
 */
router.get("/list/:page/:pageSize", courseOfferingController.getCourseOfferingListAsync);

/**
 * @openapi
 * '/api/courseOfferings/detail':
 *  get:
 *     tags:
 *     - CourseOffering
 *     summary: Get course offering by ID
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.get("/detail", courseOfferingController.getCourseOfferingByIdAsync);

/**
 * @openapi
 * '/api/courseOfferings/add':
 *  post:
 *     tags:
 *     - CourseOffering
 *     summary: Add a course offering
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - course_instance_id
 *               - teacher_id
 *               - start_date
 *               - end_date
 *               - student_capacity
 *               - status
 *             properties:
 *               course_instance_id:
 *                 type: integer
 *               teacher_id:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               student_capacity:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [Scheduled, In Progress, Completed, Cancelled]
 *               createdBy:
 *                 type: integer
 *               updatedBy:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.post(
    "/add",
    commonValidate([
        body("course_instance_id")
            .notEmpty()
            .withMessage("course_instance_id is required")
            .isInt()
            .withMessage("course_instance_id must be an integer"),
        body("teacher_id")
            .notEmpty()
            .withMessage("teacher_id is required")
            .isInt()
            .withMessage("teacher_id must be an integer"),
        body("start_date")
            .notEmpty()
            .withMessage("start_date is required")
            .isISO8601()
            .withMessage("start_date must be a valid date"),
        body("end_date")
            .notEmpty()
            .withMessage("end_date is required")
            .isISO8601()
            .withMessage("end_date must be a valid date"),
        body("student_capacity")
            .notEmpty()
            .withMessage("student_capacity is required")
            .isInt({ min: 1 })
            .withMessage("student_capacity must be an integer greater than 0"),
        body("status")
            .notEmpty()
            .withMessage("status is required")
            .isIn(["Scheduled", "In Progress", "Completed", "Cancelled"])
            .withMessage("status must be one of Scheduled, In Progress, Completed, Cancelled"),
    ]),
    courseOfferingController.addCourseOfferingAsync
);

/**
 * @openapi
 * '/api/courseOfferings/update':
 *  put:
 *     tags:
 *     - CourseOffering
 *     summary: Update course offering by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *               student_capacity:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [Pending Start, Active, Completed]
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not Found
 */
router.put("/update", courseOfferingController.updateCourseOfferingByIdAsync);

/**
 * @openapi
 * '/api/courseOfferings/delete/{id}':
 *  delete:
 *     tags:
 *     - CourseOffering
 *     summary: Delete one or multiple course offerings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1,2"
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not Found
 */
router.delete("/delete/:id", courseOfferingController.deleteCourseOfferingByIdAsync);

module.exports = router;
