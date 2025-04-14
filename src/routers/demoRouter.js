const express = require('express');
require('express-async-errors');
const router = express.Router();

const { body, query, param } = require('express-validator');

const { commonValidate } = require('../middlewares/expressValidator');
const demoController = require('../controllers/demoController');

/**
 * @openapi
 * '/api/demos':
 *  post:
 *     tags:
 *     - demo Controller
 *     summary: add demo
 *     description: add demo
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: string
 *                default: test
 *              mark:
 *                type: string
 *                default: mark123
 *              count:
 *                type: number
 *                default: 122
 *              active:
 *                type: boolean
 *                default: true
 *              dataTime:
 *                type: datetime
 *                default: 2022-02-02 23:10:15
 *     responses:
 *      201:
 *        description: Created
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
    '',
    commonValidate([body('title').notEmpty().withMessage('Not a valid title')]),
    demoController.createAsync
);

/**
 * @openapi
 * '/api/demos':
 *  get:
 *     tags:
 *     - demo Controller
 *     summary: Get all demos
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
router.get('', demoController.getAllAsync);

module.exports = router;
