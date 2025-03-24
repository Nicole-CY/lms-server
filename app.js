require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const appConfig = require("./appConfig");

const cors = require("cors");

app.use(
  cors({
    origin: appConfig.corsConfig.origin,
    credentials: true,
  })
);

//config commonresult
const returnValue = require("./middleware/returnValue");
app.use(returnValue.returnValue);

//config josn body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//parse Cookie
app.use(cookieParser());

const { expressjwt: jwtMiddleware } = require('express-jwt');
app.use(jwtMiddleware({
  secret: appConfig.jwtConfig.secret,
  algorithms: appConfig.jwtConfig.algorithms,
  getToken: (req) => req.cookies.token
}).unless({ path: ['/', /^\/api-docs/, '/api/auth/login', '/api/auth/register'] }));

// config Swagger
const swaggerDocument = require("./common/swagger");
const swaggerUi = require("swagger-ui-express");
// config'/api-docs'  Path to access Swagger UI
const swaggerUiOptions = {
  explorer: true,
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerUiOptions)
);

app.get("/", (req, res) => {
  res.send("server running " + new Date().toLocaleString());
});

//config authRouter
const authRouter = require("./router/authRouter");
app.use("/api/auth", authRouter);

//config userRouter
const userRouter = require("./router/userRouter");
app.use("/api/users", userRouter);

//config demoRouter
const demoRouter = require("./router/demoRouter");
app.use("/api/demos", demoRouter);

//config roleRouter
const roleRouter = require("./router/roleRouter");
app.use("/api/roles", roleRouter);

//config categoryRouter
const categoryRouter = require("./router/categoryRouter");
app.use("/api/categories", categoryRouter);

//config courseRouter
const courseRouter = require("./router/courseRouter");
app.use("/api/courses", courseRouter);

//config sessionRouter
const sessionRouter = require("./router/sessionrouter");
app.use("/api/sessions", sessionRouter);

//config courseOfferingRouter
const courseOfferingRouter = require("./router/courseOfferingRouter");
app.use("/api/courseOfferings", courseOfferingRouter);

//config courseNotificationROuters
const courseNotificationRouter = require("./router/courseNotificationRouter");
app.use("/api/courseNotifications", courseNotificationRouter);

//config menuRouter
const menuRouter = require("./router/menuRouter");
app.use("/api/menus", menuRouter);

//config erorhandle
const erorhandle = require("./middleware/errorHandling");
app.use(erorhandle.errorHandling);

let port = appConfig.serverConfig.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port},http://localhost:${port}`);
  console.log(`Swagger is running on http://localhost:${port}/api-docs/`);
});
