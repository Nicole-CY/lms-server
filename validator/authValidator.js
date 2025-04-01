const { body } = require("express-validator");

const loginValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Must be a valid email address"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6, max: 50 }).withMessage("Password must be between 6 and 50 characters"),
];

const registerValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Must be a valid email address"),

  body("firstName")
    .trim()
    .notEmpty().withMessage("First name is required"),

  body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is required"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6, max: 50 }).withMessage("Password must be between 6 and 50 characters"),
];

module.exports = {
  loginValidator, registerValidator
};
