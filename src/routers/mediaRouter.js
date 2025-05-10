const express = require('express');
require('express-async-errors');

const router = express.Router();
const { commonValidate } = require('../middlewares/expressValidator');
const mediaController = require('../controllers/Course/mediaController');
const {
    addMediaValidator,
    getMediaBySessionIdValidator,
    updateMediaValidator,
    deleteMediaValidator,
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

// Get all media files
/**
 * @openapi
 * '/api/media/getBySessionId':
 *  get:
 *     tags:
 *     - Media Controller
 *     summary: Get media files by session ID
 *     description: Retrieve all media files associated with a specific session ID
 *     parameters:
 *      - name: sessionId
 *        in: query
 *        description: The ID of the session
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Media files fetched successfully
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
    '/getBySessionId',
    commonValidate(getMediaBySessionIdValidator),
    mediaController.getMediaBySessionIdAsync
);

// Update media file
/**
 * @openapi
 * '/api/media/{id}':
 *  put:
 *     tags:
 *     - Media Controller
 *     summary: Update media file
 *     description: Update details of a media file by its ID
 *     # security:
 *     #   - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the media file to update
 *        schema:
 *          type: integer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - fileName
 *            properties:
 *              id:
 *                type: integer
 *                default: 1
 *              sessionId:
 *                type: integer
 *                default: 1
 *                description: "The session this media belongs to"
 *              fileType:
 *                type: string
 *                default: "video"
 *              fileName:
 *                type: string
 *                default: "lesson1-intro.mp4"
 *              filePath:
 *                type: string
 *                default: "/uploads/lesson1-intro.mp4"
 *              thumbnailPath:
 *                type: string
 *                default: "/uploads/thumbnails/lesson1-thumb.png"
 *              uploaderId:
 *                type: integer
 *                default: 1
 *              approvalStatus:
 *                type: string
 *                default: "Pending"
 *              createdAt:
 *                type: string
 *                format: date-time
 *              updatedAt:
 *                type: string
 *                format: date-time
 *     responses:
 *      200:
 *        description: Media file updated successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Media not found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.put('/:id', commonValidate(updateMediaValidator), mediaController.updateMediaAsync);

// delete media
/**
 * @openapi
 * '/api/media/{id}':
 *  delete:
 *     tags:
 *       - Media Controller
 *     summary: Delete media
 *     description: Delete a single media file by its ID.
 *     # security:
 *     #   - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the media file to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Media deleted successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Media Not Found
 *       500:
 *         description: Server Error
 */
router.delete('/:id', commonValidate(deleteMediaValidator), mediaController.deleteMediaAsync);

module.exports = router;
