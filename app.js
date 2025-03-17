require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");
app.use(cors({
  origin: 'http://localhost:9008', 
  credentials: true
}));

//config commonresult
const returnvalue = require("./middleware/returnvalue");
app.use(returnvalue.returnvalue);

//config josn body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//parse Cookie
app.use(cookieParser());

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

//config authrouter
const authrouter = require("./router/authrouter");
app.use("/api/auth", authrouter);

//config userrouter
const userrouter = require("./router/userrouter");
app.use("/api/users", userrouter);

//config demorouter
const demorouter = require("./router/demorouter");
app.use("/api/demos", demorouter);

//config categoryrouter
const categoryrouter = require("./router/categoryrouter");
app.use("/api/categories", categoryrouter);

//config courseRouter
const courseRouter = require('./router/courseRouter');
app.use("/api/courses", courseRouter);

//config erorhandle
const erorhandle = require("./middleware/errorhandling");
app.use(erorhandle.errorhandling);

let port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port},http://localhost:${port}`);
  console.log(`Swagger is running on http://localhost:${port}/api-docs/`);
});
