// courseNotificationRoutes.js
const express = require('express');
require('express-async-errors');
const router = express.Router();

const { body, query, param } = require('express-validator');

const { commonValidate } = require('../middlewares/expressValidator');
const courseNotificationController = require('../controllers/Course/courseNotificationController');

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
 *           example: 1
 *       - name: pageSize
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
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
    '/list/:page/:pageSize',
    commonValidate([
        param('page').isInt({ min: 1 }),
        param('pageSize').isInt({ min: 1 }),
        query('search').optional().isString(),
    ]),
    courseNotificationController.getCourseNotificationListAsync
);

/**
 * @openapi
 * '/api/courseNotifications/options':
 *  get:
 *     tags:
 *     - CourseNotification
 *     summary: Get notification options (users and course offerings)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       label:
 *                         type: string
 *                 courseOfferings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       label:
 *                         type: string
 *       500:
 *         description: Internal Server Error
 */
router.get('/options', courseNotificationController.getNotificationOptionsAsync);

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
 *           example: 1
 *     responses:
 *       200:
 *         description: Notification found
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.get(
    '/detail',
    commonValidate([
        query('id').notEmpty().isInt({ min: 1 }).withMessage('id must be a positive integer'),
    ]),
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
 *                 example: 2
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
router.post(
    '/add',
    commonValidate([
        body('recipient_id').notEmpty().isInt(),
        body('course_offering_id').notEmpty().isInt(),
        body('message').notEmpty().isString(),
        body('status').notEmpty().isIn(['Unread', 'Read']),
    ]),
    courseNotificationController.addCourseNotificationAsync
);
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
 *                 example: 1
 *               message:
 *                 type: string
 *                 example: "updated message"
 *               status:
 *                 type: string
 *                 enum: [Unread, Read]
 *                 example: "Read"
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.put(
    '/update',
    commonValidate([
        body('id').notEmpty().isInt(),
        body('message').optional().isString(),
        body('status').optional().isIn(['Unread', 'Read']),
    ]),
    courseNotificationController.updateCourseNotificationByIdAsync
);
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
 *         description: Comma-separated IDs to delete
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.delete(
    '/delete/:id',
    commonValidate([
        param('id')
            .notEmpty()
            .matches(/^(\d+)(,\d+)*$/)
            .withMessage('id must be one or more integers separated by commas'),
    ]),
    courseNotificationController.deleteCourseNotificationByIdAsync
);

module.exports = router;
