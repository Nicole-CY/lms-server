const { body, query, param } = require("express-validator");

const addCourseValidator = [
  body("title")
    .notEmpty().withMessage("title is required")
    .isString().withMessage("title must be a string")
    .isLength({ min: 3, max: 100 }).withMessage("title length must be between 3 and 100 characters"),
    
  body("courseCode")
    .notEmpty().withMessage("courseCode is required")
    .isString().withMessage("courseCode must be a string")
    .isLength({ min: 3, max: 20 }).withMessage("courseCode length must be between 3 and 20 characters"),
    
  body("coverImage").optional().isString().withMessage("Cover image must be a string"),
  body("description").optional().isString().withMessage("Description must be a string"),
  // Categories must be an array, even for one category.
  body("categories").optional().isArray().withMessage("categories must be an array"),
  body("categories.*").optional().isInt({ min: 1 }).withMessage("each category id must be a valid integer"),
];

const updateCourseValidator = [
  body("id")
    .notEmpty().withMessage("id is required")
    .isInt({ min: 1 }).withMessage("id must be a valid integer"),
    
  body("title")
    .notEmpty().withMessage("title is required")
    .isString().withMessage("title must be a string")
    .isLength({ min: 3, max: 100 }).withMessage("title length must be between 3 and 100 characters"),
    
  body("courseCode")
    .notEmpty().withMessage("courseCode is required")
    .isString().withMessage("courseCode must be a string")
    .isLength({ min: 3, max: 20 }).withMessage("courseCode length must be between 3 and 20 characters"),
    
  body("coverImage").optional().isString().withMessage("Cover image must be a string"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("categories").optional().isArray().withMessage("categories must be an array"),
  body("categories.*").optional().isInt({ min: 1 }).withMessage("each category id must be a valid integer"),
];
    
const getCourseByTitleValidator = [
  query("title").notEmpty().withMessage("title is required"),
];
const getCourseByCodeValidator = [
  query("courseCode").notEmpty().withMessage("courseCode is required"),
];
const getCourseByIdValidator = [
  query("id")
    .notEmpty().withMessage("id is required")
    .isInt({ min: 1 }).withMessage("id must be a valid integer"),
];
const getCourseListValidator = [
  query("page")
    .optional()
    .isInt({ allow_leading_zeroes: false, min: 1 })
    .withMessage("Page must be an integer greater than 0"),
  query("pageSize")
    .optional()
    .isInt({ allow_leading_zeroes: false, min: 1 })
    .withMessage("Page size must be an integer greater than 0"),
  query("title").optional().isString().withMessage("Title filter must be a string"),
  query("courseCode").optional().isString().withMessage("Course code filter must be a string"),
  // For filtering courses by categories, expect an array.
  query("categories").optional().isArray().withMessage("categories must be an array"),
  query("categories.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("each category id must be a valid integer"),
];

const deleteCourseValidator = [
  param("id")
    .notEmpty().withMessage("course id is required")
    .isInt({ min: 1 }).withMessage("not a valid course id"),
];

const bulkDeleteCoursesValidator = [
  body("ids")
    .notEmpty().withMessage("ids are required")
    .isArray({ min: 1 }).withMessage("ids must be a non-empty array"),
  body("ids.*")
    .isInt({ min: 1 })
    .withMessage("each id must be a valid integer"),
];

module.exports = {
  addCourseValidator,
  updateCourseValidator,
  getCourseByTitleValidator,
  getCourseByCodeValidator,
  getCourseByIdValidator,
  getCourseListValidator,
  deleteCourseValidator,
  bulkDeleteCoursesValidator,
};