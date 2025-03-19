const express = require("express");
require("express-async-errors");
const router = express.Router();
const {body, query, param,} = require("express-validator");
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
    "/getByTitle",
    commonValidate([query("title").notEmpty().withMessage("not a valid course title")]),
    courseController.getCourseAsync
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
    "/getByCode",
    commonValidate([
        query("courseCode").notEmpty().withMessage("not a valid courseCode"),
    ]),
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
router.get("/getById",
    commonValidate([
    query("id").notEmpty().withMessage("not a valid id"),
]),
courseController.getCourseByIdAsync);

/**
 * @openapi
 * '/api/courses/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - Course Controller
 *     summary: Get all courses
 *     # security:
 *     #   - BearerAuth: []
 *     parameters:
 *      - name: page
 *        in: path
 *        description: the page number
 *        required: true
 *        schema:
 *          type: integer
 *      - name: pageSize
 *        in: path
 *        description: the number of courses per page
 *        required: true
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

router.get(
    "/:page/:pageSize",
    commonValidate([
        param("page").notEmpty().isInt({allow_leading_zeroes: false, min: 1}).withMessage("not a valid page"),
        param("pageSize").notEmpty().isInt({allow_leading_zeroes: false, min : 1}).withMessage("not a valid page size"),
    ]),
    courseController.getCourseListAsync
);

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
router.put(
    "",
    commonValidate([
      body("id").notEmpty().withMessage("Not a valid id"),
      body("title").notEmpty().withMessage("Not a valid title"),
      body("courseCode").notEmpty().withMessage("Not a valid courseCode")
    ]),
    courseController.updateCourseAsync
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
router.delete(
    "/:id",
    commonValidate([
        param("id").notEmpty().isInt({min: 1}).withMessage("not a valid course id")
    ]),
    courseController.deleteCourseAsync
);
  
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
router.delete("/bulk",
    commonValidate([
    body("ids").isArray({min: 1}).withMessage("ids must be a non-empty array"), //the array must contain at least one element
    body("ids.*").isInt({min :1}).withMessage("each id must be a valid integer"),//"ids.*" means “for every item inside the ids(property) array, apply the following validations; { min: 1 } means each integer must be at least 1 (so negative numbers or zero are not allowed)
]),
courseController.bulkDeleteCoursesAsync);

module.exports = router;

