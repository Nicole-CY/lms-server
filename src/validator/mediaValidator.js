const { body, param, query } = require("express-validator");

// Validator for adding a new media file
const addMediaValidator = [
    body("sessionId")
        .notEmpty().withMessage("Session ID is required")
        .isInt({ min: 1 }).withMessage("Session ID must be an integer"),
    body("fileType")
        .notEmpty().withMessage("file type is required"),
    body("fileName")
        .notEmpty().withMessage("file name is required")
        .isLength({ max: 255 }).withMessage("file name length no more than 255 characters"),
    body("filePath")
        .notEmpty().withMessage("file path is required"),
    body("thumbnailPath")
        .optional(),
    body("approvalStatus")
        .notEmpty().withMessage("approval status is required"),
];

// Validator for updating a media file

module.exports = {
    addMediaValidator,

};
