const express = require('express');

require('express-async-errors');
const router = express.Router();
const { commonValidate } = require('../middlewares/expressValidator');
const courseController = require('../controllers/Course/courseController');
const {
    addCourseValidator,
    updateCourseValidator,
    getCourseByTitleValidator,
    getCourseByCodeValidator,
    getCourseByIdValidator,
    getCourseListValidator,
    deleteCourseValidator,
    bulkDeleteCoursesValidator,
} = require('../validator/courseValidator');

/**
 * @openapi
 * '/api/courses':
 *  post:
 *     tags:
 *     - Course Controller
 *     summary: add course
 *     description: Create a new course with associated categories.
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
router.post('', commonValidate(addCourseValidator), courseController.addCourseAsync);

/**
 * @openapi
 * '/api/courses/getByTitle':
 *  get:
 *     tags:
 *     - Course Controller
 *     summary: get a course by its title
 *     description: get a course by its title
 *     # security:
 *     #   - BearerAuth: []
 *
 *     parameters:
 *      - name: title
 *        in: query
 *        description: The title of the course
 *        require: true
 *        schema:
 *          type: string
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
    '/getByTitle',
    commonValidate(getCourseByTitleValidator),
    courseController.getCourseByTitleAsync
);

/**
 * @openapi
 * '/api/courses/getByCode':
 *  get:
 *     tags:
 *     - Course Controller
 *     summary: get a course by its courseCode
 *     description: get a course by its courseCode
 *     # security:
 *     #   - BearerAuth: []
 *
 *     parameters:
 *      - name: courseCode
 *        in: query
 *        description: The courseCode of the course
 *        require: true
 *        schema:
 *          type: string
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
    '/getByCode',
    commonValidate(getCourseByCodeValidator),
    courseController.getCourseByCourseCodeAsync
);

/**
 * @openapi
 * '/api/courses/getById':
 *  get:
 *     tags:
 *     - Course Controller
 *     summary: get a course by its id
 *     description: get a course by its id
 *     # security:
 *     #   - BearerAuth: []
 *
 *     parameters:
 *      - name: id
 *        in: query
 *        description: The id of the course
 *        require: true
 *        schema:
 *          type: integer
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
router.get('/getById', commonValidate(getCourseByIdValidator), courseController.getCourseByIdAsync);

/**
 * @openapi
 * '/api/courses':
 *  get:
 *     tags:
 *     - Course Controller
 *     summary: Get courses with filters and pagination
 *     description: Returns a paginated list of courses optionally filtered by title, courseCode, and category.
 *     # security:
 *     #   - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: the page number
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: the number of courses per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: title
 *         in: query
 *         description: Filter courses by title (partial match)
 *         required: false
 *         schema:
 *           type: string
 *       - name: courseCode
 *         in: query
 *         description: Filter courses by course code (partial match)
 *         required: false
 *         schema:
 *           type: string
 *       - name: categories
 *         in: query
 *         description: Filter courses by an array of category IDs
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             types: integer
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

router.get('/', commonValidate(getCourseListValidator), courseController.getCourseListAsync);

/**
 * @openapi
 * '/api/courses':
 *  put:
 *     tags:
 *     - Course Controller
 *     summary: Update course
 *     description: Update course details
 *     # security:
 *     #   - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - title
 *              - courseCode
 *            properties:
 *              id:
 *                type: number
 *                default: 0
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
 *      200:
 *        description: Course updated successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.put('', commonValidate(updateCourseValidator), courseController.updateCourseAsync);

/**
 * @openapi
 * '/api/courses/bulk':
 *  delete:
 *     tags:
 *       - Course Controller
 *     summary: Bulk delete courses
 *     description: Delete multiple courses by an array of ids.
 *     # security:
 *     #   - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: An array of course ids to delete.
 *     responses:
 *       200:
 *         description: Courses deleted successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

// First: More specific route for bulk delete
router.delete(
    '/bulk',
    commonValidate(bulkDeleteCoursesValidator),
    courseController.bulkDeleteCoursesAsync
);

/**
 * @openapi
 * '/api/courses/{id}':
 *  delete:
 *     tags:
 *       - Course Controller
 *     summary: Delete course
 *     description: Delete a single course by its id.
 *     # security:
 *     #   - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the course to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

// Then: Generic route for single course delete
router.delete('/:id', commonValidate(deleteCourseValidator), courseController.deleteCourseAsync);

module.exports = router;
