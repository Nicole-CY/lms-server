const { body } = require("express-validator");

const roleValidator = [ 
  body("role_name")
    .notEmpty()
    .withMessage("Role name is required")
    .isString()
    .withMessage("Role name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Role name must be between 3 and 50 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
];

module.exports = { roleValidator };