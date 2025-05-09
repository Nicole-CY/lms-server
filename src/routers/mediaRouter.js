const express = require('express');
require('express-async-errors');

const router = express.Router();
const { commonValidate } = require('../middlewares/expressValidator');
const mediaController = require('../controllers/Course/mediaController');
const {
    addMediaValidator,
} = require('../validator/mediaValidator');

// Add media
/**
 * @openapi
 * '/api/media':
 *  post:
 *     tags:
 *     - Media Controller
 *     summary: Add a new media file
 *     description: Upload a new media file for a specific session.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - sessionId
 *              - fileType
 *              - fileName
 *              - filePath
 *              - approvalStatus
 *            properties:
 *              sessionId:
 *                type: integer
 *                example: 1
 *              fileType:
 *                type: string
 *                enum: [video, pdf]
 *                example: "video"
 *              fileName:
 *                type: string
 *                example: "lesson1-intro.mp4"
 *              filePath:
 *                type: string
 *                example: "/uploads/lesson1-intro.mp4"
 *              thumbnailPath:
 *                type: string
 *                nullable: true
 *                example: "Introduction to JavaScript"
 *              uploaderId:
 *                type: integer
 *                example: 1
 *              approvalStatus:
 *                type: string
 *                enum: [Pending, Approved, Rejected]
 *                example: "Pending"
 *     responses:
 *      201:
 *        description: Media file uploaded successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                sessionId:
 *                  type: integer
 *                  example: 1
 *                fileType:
 *                  type: string
 *                  enum: [video, pdf]
 *                  example: "video"
 *                fileName:
 *                  type: string
 *                  example: "lesson1-intro.mp4"
 *                filePath:
 *                  type: string
 *                  example: "/uploads/lesson1-intro.mp4"
 *                thumbnailPath:
 *                  type: string
 *                  nullable: true
 *                  example: "Introduction to JavaScript"
 *                uploaderId:
 *                  type: integer
 *                  example: 1
 *                approvalStatus:
 *                  type: string
 *                  enum: [Pending, Approved, Rejected]
 *                  example: "Pending"
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post('', commonValidate(addMediaValidator), mediaController.addMediaAsync);

module.exports = router;
