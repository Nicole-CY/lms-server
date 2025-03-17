const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../appConfig");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const verifyCsrfToken = (req, res, next) => {
  const csrfCookie = req.cookies["XSRF-TOKEN"];
  const csrfHeader = req.headers["x-xsrf-token"];

  if (!csrfCookie || !csrfHeader) {
    return res.status(403).json({ message: "CSRF token missing" });
  }

  if (csrfCookie !== csrfHeader) {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }

  next();
};

module.exports = {
  authenticateToken,
  verifyCsrfToken,
};
