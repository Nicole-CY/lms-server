const { body } = require("express-validator");

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Not a valid email")
    .isLength({ min: 3, max: 50 })
    .withMessage("The username length must be between 3 and 50"),
    
  body("password")
    .notEmpty()
    .withMessage("Not a valid password")
    .isLength({ min: 6, max: 50 })
    .withMessage("The password length must be between 6 and 50"),
];

module.exports = {
  loginValidator,
};
