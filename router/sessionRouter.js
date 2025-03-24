const express = require("express");
require("express-async-errors");

const sessionRouter = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

const sessionController = require("../controller/Course/sessionController");

// Add session
sessionRouter.post(
    "",
    commonValidate([
        body("courseInstanceId").notEmpty().withMessage("courseInstanceId is required"),
        body("sessionTitle").notEmpty().withMessage("title is required"),
    ]),
    sessionController.addSessionAsync
);

// Get session by id
sessionRouter.get(
    "/getById",
    commonValidate([
        param("id").notEmpty().withMessage("not a valid session id"),
    ]),
    sessionController.getSessionByIdAsync
);

// Get sessions by courseInstanceId
sessionRouter.get(
    "/getByCourse",
    commonValidate([
        query("courseInstanceId").notEmpty().withMessage("not a valid course instance id"),
    ]),
    sessionController.getSessionsByCourseInstanceIdAsync
);

// Get paged session list
sessionRouter.get(
    "/?page/?pageSize",
    commonValidate([
        query("page").notEmpty().isInt({ min: 1 }).withMessage("not a valid page"),
        query("pageSize").notEmpty().isInt({ min: 1 }).withMessage("not a valid page size"),
    ]),
    sessionController.getSessionListAsync
);

// Update session
sessionRouter.put(
    "",
    commonValidate([
        body("id").notEmpty().withMessage("Not a valid session id"),
        body("sessionTitle").notEmpty().withMessage("Not a valid title"),
    ]),
    sessionController.updateSessionAsync
);

// Delete session
sessionRouter.delete(
    "/:id",
    commonValidate([
        param("id").notEmpty().isInt({ min: 1 }).withMessage("not a valid session id")
    ]),
    sessionController.deleteSessionAsync
);

module.exports = sessionRouter;
