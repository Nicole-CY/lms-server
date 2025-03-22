

const express = require("express");
require("express-async-errors");
const router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

const courseOfferingController = require("../controller/Course/courseOfferingController");

/**
 * @openapi
 * '/api/course-offerings/list/{page}/{pageSize}':
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
 * '/api/course-offerings/detail':
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
 * '/api/course-offerings/add':
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
 *               student_capacity:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [Pending Start, Active, Completed]
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.post("/add", courseOfferingController.addCourseOfferingAsync);

/**
 * @openapi
 * '/api/course-offerings/update':
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
 * '/api/course-offerings/delete/{id}':
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
