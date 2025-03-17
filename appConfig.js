require("dotenv").config();

module.exports = {
  jwtConfig: {
    secret: process.env.JWT_SECRET,                  
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    algorithms: process.env.JWT_ALGORITHMS ? process.env.JWT_ALGORITHMS.split(',') : ["HS256"],
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  mysqlConfig: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  redisConfig: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
};