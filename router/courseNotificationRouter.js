// courseNotificationRoutes.js
const express = require("express");
require("express-async-errors");
const router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");
const courseNotificationController = require("../controller/Course/courseNotificationController");

/**
 * @openapi
 * '/api/courseNotifications/list/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - CourseNotification
 *     summary: Get notification list (optional recipient_id search)
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
 *         description: Success
 *       500:
 *         description: Server Error
 */
router.get(
    "/list/:page/:pageSize",
    commonValidate([
        param("page").isInt({ min: 1 }),
        param("pageSize").isInt({ min: 1 }),
    ]),
    courseNotificationController.getCourseNotificationListAsync
);

/**
 * @openapi
 * '/api/courseNotifications/detail':
 *  get:
 *     tags:
 *     - CourseNotification
 *     summary: Get notification by ID
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notification found
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.get(
    "/detail",
    commonValidate([query("id").notEmpty().withMessage("id is required")]),
    courseNotificationController.getCourseNotificationByIdAsync
);

/**
 * @openapi
 * '/api/courseNotifications/add':
 *  post:
 *     tags:
 *     - CourseNotification
 *     summary: Add a notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipient_id
 *               - course_offering_id
 *               - message
 *               - status
 *             properties:
 *               recipient_id:
 *                 type: integer
 *                 example: 3
 *               course_offering_id:
 *                 type: integer
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: "Reminder: Class starts tomorrow"
 *               status:
 *                 type: string
 *                 enum: [Unread, Read]
 *                 example: "Unread"
 *     responses:
 *       201:
 *         description: Notification created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.post("/add", courseNotificationController.addCourseNotificationAsync);

/**
 * @openapi
 * '/api/courseNotifications/update':
 *  put:
 *     tags:
 *     - CourseNotification
 *     summary: Update a notification by ID
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
 *               message:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Unread, Read]
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.put("/update", courseNotificationController.updateCourseNotificationByIdAsync);

/**
 * @openapi
 * '/api/courseNotifications/delete/{id}':
 *  delete:
 *     tags:
 *     - CourseNotification
 *     summary: Delete one or multiple notifications
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "1,2,3"
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.delete(
    "/delete/:id",
    param("id").notEmpty().withMessage("id is required"),
    courseNotificationController.deleteCourseNotificationByIdAsync
);

module.exports = router;

