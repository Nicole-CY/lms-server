const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');
const { expressjwt: jwtMiddleware } = require('express-jwt');
const swaggerUi = require('swagger-ui-express');

const appConfig = require('./appConfig');

app.use(
    cors({
        origin: appConfig.corsConfig.origin,
        credentials: true,
    })
);

// config commonresult
const returnValue = require('./src/middlewares/returnValue');
app.use(returnValue.returnValue);

// config josn body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse Cookie
app.use(cookieParser());

const setUserFromToken = require('./src/middlewares/setUserFromToken');

app.use(
    jwtMiddleware({
        secret: appConfig.jwtConfig.secret,
        algorithms: appConfig.jwtConfig.algorithms,
        getToken: req => req.cookies.token,
    }).unless({ path: ['/', /^\/api-docs/, '/api/auth/login', '/api/auth/register'] })
);

// config Swagger
const swaggerDocument = require('./src/common/swagger');

// config'/api-docs'  Path to access Swagger UI
const swaggerUiOptions = {
    explorer: true,
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));

app.get('/', (req, res) => {
    res.send('server running ' + new Date().toLocaleString());
});

// config authRouter
const authRouter = require('./src/routers/authRouter');
app.use('/api/auth', authRouter);

// config userRouter
const userRouter = require('./src/routers/userRouter');
app.use('/api/users', userRouter);

// config demoRouter
const demoRouter = require('./src/routers/demoRouter');
app.use('/api/demos', demoRouter);

// config roleRouter
const roleRouter = require('./src/routers/roleRouter');
app.use('/api/roles', setUserFromToken, roleRouter);

// config categoryRouter
const categoryRouter = require('./src/routers/categoryRouter');
app.use('/api/categories', categoryRouter);

// config courseRouter
const courseRouter = require('./src/routers/courseRouter');
app.use('/api/courses', courseRouter);

// config sessionRouter
const sessionRouter = require('./src/routers/sessionsRouter');
app.use('/api/sessions', sessionRouter);

// config courseOfferingRouter
const courseOfferingRouter = require('./src/routers/courseOfferingRouter');
app.use('/api/courseOfferings', courseOfferingRouter);

// config courseNotificationROuters
const courseNotificationRouter = require('./src/routers/courseNotificationRouter');
app.use('/api/courseNotifications', courseNotificationRouter);

// config menuRouter
const menuRouter = require('./src/routers/menuRouter');
app.use('/api/menus', menuRouter);

// config permissionRouter
const permissionRouter = require('./src/routers/permissionRouter');
app.use('/api/permissions', permissionRouter);

// config errorHandle
const errorHandle = require('./src/middlewares/errorHandling');
app.use(errorHandle.errorHandling);

module.exports = app;
