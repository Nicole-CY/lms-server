

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
 *           example: 1
 *         description: Page number for pagination
 *       - name: pageSize
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional search keyword (course name, teacher, etc.)

 *     responses:
 *       200:
 *         description: Fetched successfully
 */
router.get(
    "/list/:page/:pageSize",
    commonValidate([
      param("page")
        .notEmpty()
        .withMessage("page is required")
        .isInt({ min: 1 })
        .withMessage("page must be a positive integer"),
      param("pageSize")
        .notEmpty()
        .withMessage("pageSize is required")
        .isInt({ min: 1 })
        .withMessage("pageSize must be a positive integer"),
      query("search")
        .optional()
        .isString()
        .isLength({ max: 100 })
        .withMessage("search must be a string"),
    ]),
    courseOfferingController.getCourseOfferingListAsync
  );


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
 *           example: 1
 *         description: ID of the course offering to retrieve
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.get(
    "/detail",
    commonValidate([
      query("id")
        .notEmpty()
        .withMessage("id is required")
        .isInt({ min: 1 })
        .withMessage("id must be a positive integer"),
    ]),
    courseOfferingController.getCourseOfferingByIdAsync
  );

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
 *                 example: 1
 *               teacher_id:
 *                 type: integer
 *                 example: 3
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-06"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-20"
 *               student_capacity:
 *                 type: integer
 *                 example: 30
 *               status:
 *                 type: string
 *                 enum: [Scheduled, In Progress, Completed, Cancelled]
 *                 example: "Scheduled"
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *               updatedBy:
 *                 type: integer
 *                 example: 1
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
 *   put:
 *     tags:
 *       - CourseOffering
 *     summary: Update a course offering by ID
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
 *                 example: 1
 *                 description: The ID of the course offering to update
 *               course_instance_id:
 *                 type: integer
 *                 example: 1
 *               teacher_id:
 *                 type: integer
 *                 example: 3
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-06"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-04-20"
 *               student_capacity:
 *                 type: integer
 *                 example: 30
 *               status:
 *                 type: string
 *                 enum: [Scheduled, In Progress, Completed, Cancelled]
 *                 example: "In Progress"
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *               updatedBy:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.put(
    "/update",
    commonValidate([
      body("id")
        .notEmpty()
        .withMessage("id is required")
        .isInt({ min: 1 })
        .withMessage("id must be a positive integer"),
  
      body("course_instance_id")
        .optional()
        .isInt()
        .withMessage("course_instance_id must be an integer"),
  
      body("teacher_id")
        .optional()
        .isInt()
        .withMessage("teacher_id must be an integer"),
  
      body("start_date")
        .optional()
        .isISO8601()
        .withMessage("start_date must be a valid date"),
  
      body("end_date")
        .optional()
        .isISO8601()
        .withMessage("end_date must be a valid date"),
  
      body("student_capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("student_capacity must be an integer greater than 0"),
  
      body("status")
        .optional()
        .isIn(["Scheduled", "In Progress", "Completed", "Cancelled"])
        .withMessage("status must be one of Scheduled, In Progress, Completed, Cancelled"),
  
      body("createdBy")
        .optional()
        .isInt()
        .withMessage("createdBy must be an integer"),
  
      body("updatedBy")
        .optional()
        .isInt()
        .withMessage("updatedBy must be an integer"),
    ]),
    courseOfferingController.updateCourseOfferingByIdAsync
  );
  

/**
 * @openapi
 * '/api/courseOfferings/delete/{id}':
 *   delete:
 *     tags:
 *       - CourseOffering
 *     summary: Delete one or multiple course offerings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1,2,3"
 *         description: One or more course offering IDs to delete (comma-separated)
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Course offering(s) not found
 */
router.delete(
    "/delete/:id",
    commonValidate([
      param("id")
        .notEmpty()
        .withMessage("id is required")
        .matches(/^(\d+)(,\d+)*$/)
        .withMessage("id must be one or more integers separated by commas, e.g. '1,2,3'"),
    ]),
    courseOfferingController.deleteCourseOfferingByIdAsync
  );
  

module.exports = router;
