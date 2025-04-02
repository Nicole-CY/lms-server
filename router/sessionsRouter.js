const express = require("express");
require("express-async-errors");

const router = express.Router();
const { commonValidate } = require("../middleware/expressValidator");

const sessionController = require("../controller/Course/sessionController");
const {addSessionValidator,
    updateSessionValidator,
    getSessionByIdValidator,
    getSessionsByCourseInstanceIdValidator,
    getSessionListValidator,
    deleteSessionValidator
} = require("../validator/sessionValidator")


// Add session
/**
 * @openapi
 * '/api/sessions':
 *  post:
 *     tags:
 *     - Session Controller
 *     summary: Add a new session
 *     description: Create a new session for a specific course instance.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - courseInstanceId
 *              - sessionTitle
 *              - order
 *            properties:
 *              courseInstanceId:
 *                type: integer
 *                example: 1
 *              sessionTitle:
 *                type: string
 *                example: "Introduction to JavaScript"
 *              order:
 *                type: integer
 *                example: 1
 *              createdBy:
 *                type: integer
 *                example: 1
 *              updatedBy:
 *                type: integer
 *                example: 1 
 *              sessionDescription:
 *                type: string
 *                example: "This session covers the basics of JavaScript."
 *     responses:
 *      201:
 *        description: Session created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 101
 *                courseInstanceId:
 *                  type: integer
 *                  example: 1
 *                sessionTitle:
 *                  type: string
 *                  example: "Introduction to JavaScript"
 *                order:
 *                  type: integer
 *                  example: 1
 *                sessionDescription:
 *                  type: string
 *                  example: "This session covers the basics of JavaScript."
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
    "",
    commonValidate(addSessionValidator),
    sessionController.addSessionAsync
);

// Get session by id
/**
 * @openapi
 * '/api/sessions/getById':
 *  get:
 *     tags:
 *     - Session Controller
 *     summary: Get a session by its ID
 *     description: Retrieve a session by its unique ID
 *     # security:
 *     #   - BearerAuth: []
 *     
 *     parameters:
 *      - name: id
 *        in: query
 *        description: The ID of the session
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Session fetched successfully
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
    "/getById",
    commonValidate(getSessionByIdValidator),
    sessionController.getSessionByIdAsync
);

// Get sessions by courseInstanceId
/**
 * @openapi
 * '/api/sessions/getByCourseInstanceId':
 *  get:
 *     tags:
 *     - Session Controller
 *     summary: Get a session by its Course Instance ID
 *     description: Retrieve a session by its Course Instance unique ID
 *     # security:
 *     #   - BearerAuth: []
 *     
 *     parameters:
 *      - name: courseInstanceId
 *        in: query
 *        description: The ID of the course instance
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Session fetched successfully
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
    "/getByCourseInstanceId",
    commonValidate(getSessionsByCourseInstanceIdValidator),
    sessionController.getSessionsByCourseInstanceIdAsync
);

// Get paged session list
/**
 * @openapi
 * '/api/sessions':
 *  get:
 *     tags:
 *     - Session Controller
 *     summary: Get sessions with filters and pagination
 *     description: Returns a paginated list of sessions optionally filtered by courseInstanceId.
 *     # security:
 *     #   - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: The number of sessions per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: courseInstanceId
 *         in: query
 *         description: Filter sessions by course instance ID
 *         required: false
 *         schema:
 *           type: integer
 *       - name: sessionTitle
 *         in: query
 *         description: Filter sessions by title (Partial match)
 *         required: false
 *         schema:
 *           type: string
 *       - name: sessionDescription
 *         in: query
 *         description: Filter sessions by description (Partial match)
 *         required: false
 *         schema:
 *           type: string
 *       - name: createdBy
 *         in: query
 *         description: Filter sessions by created user
 *         required: false
 *         schema:
 *           type: integer
 *       - name: updatedBy
 *         in: query
 *         description: Filter sessions by course updated user
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *      200:
 *        description: Sessions fetched successfully
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
    commonValidate(getSessionListValidator),
    sessionController.getSessionListAsync
);

// Update session
/**
 * @openapi
 * '/api/sessions':
 *  put:
 *     tags:
 *     - Session Controller
 *     summary: Update session
 *     description: Update session details
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
 *              - sessionTitle
 *              - order
 *            properties:
 *              id:
 *                type: number
 *                default: 0
 *              sessionTitle:
 *                type: string
 *                default: "Introduction to REST APIs"
 *              order:
 *                type: integer
 *                default: 1
 *              sessionDescription:
 *                type: string
 *                default: "This session covers the basics of REST API design"
 *              courseInstanceId:
 *                type: integer
 *                default: 101
 *                description: "The ID of the course instance this session belongs to"
 *              createdAt:
 *                type: string
 *                format: date-time
 *              updatedAt:
 *                type: string
 *                format: date-time
 *              createdBy:
 *                type: integer
 *              updatedBy:
 *                type: integer
 *     responses:
 *      200:
 *        description: Session updated successfully
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
    commonValidate(updateSessionValidator),
    sessionController.updateSessionAsync
);

// Delete session
/**
 * @openapi
 * '/api/sessions/{id}':
 *  delete:
 *     tags:
 *       - Session Controller
 *     summary: Delete session
 *     description: Delete a single session by its id.
 *     # security:
 *     #   - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of the session to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.delete(
    "/:id",
    commonValidate(deleteSessionValidator),
    sessionController.deleteSessionAsync
);

module.exports = router;
