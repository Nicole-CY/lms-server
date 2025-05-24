const express = require('express');

require('express-async-errors');
const router = express.Router();
const { commonValidate } = require('../middlewares/expressValidator');
const courseInstanceController = require('../controllers/Course/courseInstanceController');
const {
    addCourseInstanceValidator,
    updateCourseInstanceValidator,
    getCourseInstanceByIdValidator,
    getCourseInstanceListValidator,
    deleteCourseInstanceValidator,
    bulkDeleteCourseInstancesValidator,
} = require('../validator/courseInstanceValidator');

/**
 * @openapi
 * '/api/course-instances':
 *  post:
 *     tags:
 *     - Course Instance Controller
 *     summary: Add course instance
 *     description: Create a new course instance for a specific course. A course instance represents a specific offering of a course at a particular time.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - courseId
 *              - startDate
 *              - endDate
 *            properties:
 *              courseId:
 *                type: integer
 *                description: ID of the course
 *              startDate:
 *                type: string
 *                format: date
 *                description: Start date of the course instance
 *              endDate:
 *                type: string
 *                format: date
 *                description: End date of the course instance
 *              totalSessions:
 *                type: integer
 *                description: Total number of sessions
 *              launchStatus:
 *                type: string
 *                enum: [Scheduled, In Progress, Completed, Cancelled]
 *                description: Current status of the course instance
 *              createdBy:
 *                type: integer
 *                description: ID of the user creating the course instance
 *              updatedBy:
 *                type: integer
 *                description: ID of the user updating the course instance
 *     responses:
 *      201:
 *        description: Course instance created successfully
 *      400:
 *        description: Bad request - Invalid input or conflicting dates
 *      404:
 *        description: Course not found
 *      500:
 *        description: Server error
 */
router.post(
    '',
    commonValidate(addCourseInstanceValidator),
    courseInstanceController.addCourseInstanceAsync
);

/**
 * @openapi
 * '/api/course-instances/{id}':
 *  get:
 *     tags:
 *     - Course Instance Controller
 *     summary: Get course instance by ID
 *     description: Get detailed information about a specific course instance, including associated course and sessions
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *        description: The ID of the course instance to retrieve
 *     responses:
 *      200:
 *        description: Course instance found
 *      404:
 *        description: Course instance not found
 *      500:
 *        description: Server error
 */
router.get(
    '/:id',
    commonValidate(getCourseInstanceByIdValidator),
    courseInstanceController.getCourseInstanceByIdAsync
);

/**
 * @openapi
 * '/api/course-instances':
 *  get:
 *     tags:
 *     - Course Instance Controller
 *     summary: Get course instances list
 *     description: Get a paginated list of course instances with various filter options
 *     parameters:
 *      - name: page
 *        in: query
 *        schema:
 *          type: integer
 *          default: 1
 *        description: Page number
 *      - name: pageSize
 *        in: query
 *        schema:
 *          type: integer
 *          default: 10
 *        description: Number of items per page
 *      - name: courseId
 *        in: query
 *        schema:
 *          type: integer
 *        description: Filter by course ID
 *      - name: courseTitle
 *        in: query
 *        schema:
 *          type: string
 *        description: Filter by course title (partial match)
 *      - name: courseCode
 *        in: query
 *        schema:
 *          type: string
 *        description: Filter by course code (partial match)
 *      - name: launchStatus
 *        in: query
 *        schema:
 *          type: string
 *          enum: [Scheduled, In Progress, Completed, Cancelled]
 *        description: Filter by launch status
 *      - name: startDateFrom
 *        in: query
 *        schema:
 *          type: string
 *          format: date
 *        description: Filter by start date range (from)
 *      - name: startDateTo
 *        in: query
 *        schema:
 *          type: string
 *          format: date
 *        description: Filter by start date range (to)
 *      - name: endDateFrom
 *        in: query
 *        schema:
 *          type: string
 *          format: date
 *        description: Filter by end date range (from)
 *      - name: endDateTo
 *        in: query
 *        schema:
 *          type: string
 *          format: date
 *        description: Filter by end date range (to)
 *      - name: minSessions
 *        in: query
 *        schema:
 *          type: integer
 *        description: Filter by minimum number of sessions
 *      - name: maxSessions
 *        in: query
 *        schema:
 *          type: integer
 *        description: Filter by maximum number of sessions
 *      - name: includeSessions
 *        in: query
 *        schema:
 *          type: boolean
 *          default: false
 *        description: Include session data in the results
 *      - name: includeSessionCounts
 *        in: query
 *        schema:
 *          type: boolean
 *          default: false
 *        description: Include session counts in the results
 *     responses:
 *      200:
 *        description: Course instances retrieved successfully
 *      400:
 *        description: Bad request - Invalid parameters
 *      500:
 *        description: Server error
 */
router.get(
    '',
    commonValidate(getCourseInstanceListValidator),
    courseInstanceController.getCourseInstanceListAsync
);

/**
 * @openapi
 * '/api/course-instances':
 *  put:
 *     tags:
 *     - Course Instance Controller
 *     summary: Update course instance
 *     description: Update details of a specific course instance
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
 *                type: integer
 *                description: Course instance ID
 *              startDate:
 *                type: string
 *                format: date
 *                description: Start date of the course instance
 *              endDate:
 *                type: string
 *                format: date
 *                description: End date of the course instance
 *              totalSessions:
 *                type: integer
 *                description: Total number of sessions
 *              launchStatus:
 *                type: string
 *                enum: [Scheduled, In Progress, Completed, Cancelled]
 *                description: Current status of the course instance
 *              updatedBy:
 *                type: integer
 *                description: ID of the user updating the course instance
 *     responses:
 *      200:
 *        description: Course instance updated successfully
 *      400:
 *        description: Bad request - Invalid input or conflicting dates
 *      404:
 *        description: Course instance not found
 *      500:
 *        description: Server error
 */
router.put(
    '',
    commonValidate(updateCourseInstanceValidator),
    courseInstanceController.updateCourseInstanceAsync
);

/**
 * @openapi
 * '/api/course-instances/bulk':
 *  delete:
 *     tags:
 *     - Course Instance Controller
 *     summary: Bulk delete course instances
 *     description: Delete multiple course instances at once.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - ids
 *            properties:
 *              ids:
 *                type: array
 *                items:
 *                  type: integer
 *                description: Array of course instance IDs to delete
 *     responses:
 *      200:
 *        description: Course instances deleted successfully
 *      400:
 *        description: Bad request or instances have sessions
 *      500:
 *        description: Server error
 */
router.delete(
    '/bulk',
    commonValidate(bulkDeleteCourseInstancesValidator),
    courseInstanceController.bulkDeleteCourseInstancesAsync
);

/**
 * @openapi
 * '/api/course-instances/{id}':
 *  delete:
 *     tags:
 *     - Course Instance Controller
 *     summary: Delete course instance
 *     description: Delete a specific course instance. Cannot delete instances with existing sessions.
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *        description: The ID of the course instance to delete
 *     responses:
 *      200:
 *        description: Course instance deleted successfully
 *      400:
 *        description: Bad request or instance has sessions
 *      404:
 *        description: Course instance not found
 *      500:
 *        description: Server error
 */
router.delete(
    '/:id',
    commonValidate(deleteCourseInstanceValidator),
    courseInstanceController.deleteCourseInstanceAsync
);

module.exports = router;
