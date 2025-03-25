var express = require("express");
require("express-async-errors");
var router = express.Router();

const { commonValidate } = require("../middleware/expressValidator");
const { loginValidator } = require("../validator/authValidator");

const authController = require("../controller/authController");

/**
* @openapi
* '/api/auth/login':
*  post:
*     tags:
*       - auth Controller
*     summary: Login as a user and return token via cookie
*     description: Login returns JWT in HttpOnly cookie + CSRF token
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - username
*              - password
*            properties:
*              email:
*                type: string
*                default: superadmin@example.com
*              password:
*                type: string
*                default: 123456
*     responses:
*      201:
*        description: Created
*      400:
*        description: Bad Request
*      401:
*        description: Unauthorized
*      500:
*        description: Server Error 
*/
router.post(
  "/login",
  commonValidate(loginValidator),
  authController.loginAsync
);

/**
* @openapi
* '/api/auth/register':
*  post:
*     tags:
*     - auth Controller
*     summary: Register a new user
*     description: Register a new user by providing a username, email, and password.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - password
*              - email
*            properties:
*              email:
*                type: string
*                example: newuser@gmail.com
*              password:
*                type: string
*                example: 123456
*     responses:
*      201:
*        description: User registered successfully
*      400:
*        description: Bad Request
*      500:
*        description: Server Error 
*/
router.post(
  "/register",
  commonValidate(loginValidator), 
  authController.registerAsync
);


/**
* @openapi
* '/api/auth/logout':
*  post:
*     tags:
*       - auth Controller
*     summary: Logout user and clear token
*     description: Logout clears JWT and CSRF token cookies
*     responses:
*      200:
*        description: Success
*      500:
*        description: Server Error 
*/
router.post(
  "/logout",
  authController.logoutAsync
);

/**
* @openapi
* '/api/auth/me':
*  get:
*     tags:
*       - auth Controller
*     summary: Get authenticated user details
*     description: Retrieve the details of the currently authenicated user based on the provided JWT token
*     responses:
*      200:
*        description: Success
*      500:
*        description: Server Error 
*/
router.get(
  "/me",
  authController.meAsync
);

module.exports = router;
