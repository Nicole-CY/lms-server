var express = require("express");
require("express-async-errors");
var router = express.Router();

const { commonValidate } = require("../middleware/expressValidator");
const { loginValidator } = require("../validator/authValidator");

const authcontroller = require("../controller/authcontroller");
const { authenticateToken, verifyCsrfToken } = require("../middleware/authMiddleware");

/**
* @openapi
* '/api/auth/login':
*  post:
*     tags:
*     - auth Controller
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
*              username:
*                type: string
*                default: admin
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
  authcontroller.loginAsync
);

/**
* @openapi
* '/api/auth/logout':
*  post:
*     tags:
*     - auth Controller
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
  authenticateToken, 
  verifyCsrfToken,
  authcontroller.logoutAsync
);

/**
* @openapi
* '/api/auth/me':
*  post:
*     tags:
*     - auth Controller
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
  authenticateToken,    
  verifyCsrfToken,      
  authcontroller.meAsync
);

module.exports = router;
