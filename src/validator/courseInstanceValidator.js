const { body, param, query } = require("express-validator");

// Validator for adding a new course instance
const addCourseInstanceValidator = [
  body("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .isInt()
    .withMessage("Course ID must be an integer"),
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("totalSessions")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total sessions must be a positive integer"),
  body("launchStatus")
    .optional()
    .isIn(["Scheduled", "In Progress", "Completed", "Cancelled"])
    .withMessage("Invalid launch status"),
];

// Validator for updating a course instance
const updateCourseInstanceValidator = [
  body("id")
    .notEmpty()
    .withMessage("Course instance ID is required")
    .isInt()
    .withMessage("Course instance ID must be an integer"),
  body("startDate")
    .optional()
    .isDate()
    .withMessage("Start date must be a valid date"),
  body("endDate")
    .optional()
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("totalSessions")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total sessions must be a positive integer"),
  body("launchStatus")
    .optional()
    .isIn(["Scheduled", "In Progress", "Completed", "Cancelled"])
    .withMessage("Invalid launch status"),
];

// Validator for getting a course instance by ID
const getCourseInstanceByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Course instance ID is required")
    .isInt()
    .withMessage("Course instance ID must be an integer"),
];

// Validator for getting a list of course instances
const getCourseInstanceListValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page size must be a positive integer"),
  query("courseId")
    .optional()
    .isInt()
    .withMessage("Course ID must be an integer"),
  query("launchStatus")
    .optional()
    .isIn(["Scheduled", "In Progress", "Completed", "Cancelled"])
    .withMessage("Invalid launch status"),
  query("startDateFrom")
    .optional()
    .isDate()
    .withMessage("Start date from must be a valid date"),
  query("startDateTo")
    .optional()
    .isDate()
    .withMessage("Start date to must be a valid date"),
  query("endDateFrom")
    .optional()
    .isDate()
    .withMessage("End date from must be a valid date"),
  query("endDateTo")
    .optional()
    .isDate()
    .withMessage("End date to must be a valid date"),
];

// Validator for deleting a course instance
const deleteCourseInstanceValidator = [
  param("id")
    .notEmpty()
    .withMessage("Course instance ID is required")
    .isInt()
    .withMessage("Course instance ID must be an integer"),
];

// Validator for bulk deleting course instances
const bulkDeleteCourseInstancesValidator = [
  body("ids")
    .notEmpty()
    .withMessage("IDs array is required")
    .isArray()
    .withMessage("IDs must be an array")
    .custom((value) => {
      if (!value.every((id) => Number.isInteger(id) || (typeof id === 'string' && /^\d+$/.test(id)))) {
        throw new Error("All IDs must be integers");
      }
      return true;
    }),
];

module.exports = {
  addCourseInstanceValidator,
  updateCourseInstanceValidator,
  getCourseInstanceByIdValidator,
  getCourseInstanceListValidator,
  deleteCourseInstanceValidator,
  bulkDeleteCourseInstancesValidator,
};
