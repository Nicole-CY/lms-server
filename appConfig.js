module.exports = {
  jwtConfig: {
    secret: "shhhhhha3red-secret",
    audience: "apitester",
    issuer: "issuer",
    algorithms: ["HS256"],
    expiresIn: "2h",
  },
  mysqlConfig: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "moocdb",
  },
  redisConfig: {
    host: "127.0.0.1",
    port: 6379,
  },
  mysqlConfig: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
};
