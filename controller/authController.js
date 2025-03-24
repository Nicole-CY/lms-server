const bcrypt = require("bcryptjs");
const logger = require("../common/logSetting");
const { jwtConfig } = require("../appConfig");
const jwt = require("jsonwebtoken");
const userService = require("../service/userService");
const crypto = require("crypto");
const { bcryptConfig } = require("../appConfig");

const loginAsync = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.sendCommonValue(null, "Username and password are required", 0);
    }

    const result = await userService.getUserbyNameAsync(username);

    if (!result.isSuccess) {
      logger.warn(`Login failed for username: ${username}`);
      return res.sendCommonValue(null, "Authentication failed", 0);
    }

    const isMatch = await bcrypt.compare(password, result.data.password);

    if (!isMatch) {
      logger.warn(`Password mismatch for username: ${username}`);
      return res.sendCommonValue(null, "Authentication failed", 0);
    }

    const user = {
      id: result.data.id,
      role: [result.data.roles],
      username: result.data.username,
    };

    const tokenStr = jwt.sign(user, jwtConfig.secret, {
      expiresIn: `${jwtConfig.expiresIn}s`,
    });

    const csrfToken = crypto.randomBytes(24).toString("hex");

    res.cookie("token", tokenStr, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: jwtConfig.expiresIn * 1000,
    });

    res.cookie("XSRF-TOKEN", csrfToken, {
      sameSite: "None",
      httpOnly: false,
      secure: true,
      maxAge: jwtConfig.expiresIn * 1000,
    });

    return res.sendCommonValue(
      {
        username: username,
      },
      "Login successful",
      1
    );
  } catch (err) {
    logger.error(
      `Login error for username: ${req.body.username}, error: ${err}`
    );
    return res.sendCommonValue(null, "Internal server error", 0);
  }
};

const registerAsync = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!username || !password || !email) {
      return res.sendCommonValue(
        {},
        "Username, password, and email are required",
        400,
        400
      );
    }

    const existingUsername = await userService.getUserbyNameAsync(username);
    if (existingUsername.isSuccess && existingUsername.data) {
      return res.sendCommonValue({}, "Username already exists", 400, 400);
    }

    const existingEmail = await userService.getUserbyEmailAsync(email);
    if (existingEmail.isSuccess && existingEmail.data) {
      return res.sendCommonValue({}, "Email already exists", 400, 400);
    }

    const salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      email,
      username,
      password: hashedPassword,
      roles: ["user"],
    };

    const result = await userService.addUserAsync(newUser);

    if (!result.isSuccess) {
      logger.error(`User registration failed for username: ${username}`);
      return res.sendCommonValue(null, "Registration failed", 0);
    }

    logger.info(`New user registered: ${username}`);

    return res.status(201).sendCommonValue(
      {
        username: username,
      },
      "Registration successful",
      1
    );
  } catch (err) {
    logger.error(
      `Register error for username: ${req.body.username}, error: ${err}`
    );
    return res.sendCommonValue(null, "Internal server error", 0);
  }
};

const meAsync = async (req, res) => {
  try {
    const user = req.auth;

    if (!user) {
      return res.status(401).sendCommonValue(null, "Not logged in", 0);
    }

    const result = await userService.getUserbyNameAsync(user.username);

    if (!result.isSuccess) {
      return res.status(404).sendCommonValue(null, "User does not exist.", 0);
    }

    return res.sendCommonValue(
      {
        id: result.data.id,
        username: result.data.username,
        roles: result.data.roles || [],
      },
      "User information retrieved successfully.",
      1
    );
  } catch (err) {
    logger.error(`Error retrieving user information: ${err}`);
    return res.sendCommonValue(null, "Internal Server Error", 0);
  }
};

const logoutAsync = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.clearCookie("XSRF-TOKEN", {
      secure: true,
      sameSite: "None",
    });

    return res.sendCommonValue(null, "Logout successful", 1);
  } catch (err) {
    logger.error(`Logout error: ${err}`);
    return res.sendCommonValue(null, "Internal server error", 0);
  }
};

module.exports = {
  loginAsync,
  registerAsync,
  logoutAsync,
  meAsync,
};
