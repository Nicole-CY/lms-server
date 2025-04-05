const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const logger = require('../common/logSetting');
const { jwtConfig } = require('../appConfig');
const userService = require('../service/userService');
const { bcryptConfig } = require('../appConfig');

const loginAsync = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.sendCommonValue(null, 'Email and password are required', 0);
        }

        const result = await userService.getUserByEmailAsync(email, true);

        if (!result.isSuccess) {
            logger.warn(`Login failed for email: ${email}`);
            return res.sendCommonValue(null, 'Authentication failed', 0);
        }

        const isMatch = await bcrypt.compare(password, result.data.password);

        if (!isMatch) {
            logger.warn(`Password mismatch for email: ${email}`);
            return res.sendCommonValue(null, 'Authentication failed', 0);
        }

        const user = { id: result.data.id, email: result.data.email };

        const tokenStr = jwt.sign(user, jwtConfig.secret, {
            expiresIn: `${jwtConfig.expiresIn}s`,
        });

        const csrfToken = crypto.randomBytes(24).toString('hex');

        res.cookie('token', tokenStr, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: jwtConfig.expiresIn * 1000,
        });

        res.cookie('XSRF-TOKEN', csrfToken, {
            sameSite: 'None',
            httpOnly: false,
            secure: true,
            maxAge: jwtConfig.expiresIn * 1000,
        });

        return res.sendCommonValue(
            {
                email: email,
            },
            'Login successful',
            1
        );
    } catch (err) {
        logger.error(`Login error for email: ${req.body.email}, error: ${err}`);
        return res.sendCommonValue(null, 'Internal server error', 0);
    }
};

const registerAsync = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password) {
            return res.sendCommonValue({}, 'email and password are required', 400, 400);
        }

        const existingEmail = await userService.getUserByEmailAsync(email);
        if (existingEmail.isSuccess && existingEmail.data) {
            return res.sendCommonValue({}, 'Email already exists', 400, 400);
        }

        const salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            email,
            firstName,
            lastName,
            password: hashedPassword,
            roles: ['user'],
        };

        const result = await userService.addUserAsync(newUser);

        if (!result.isSuccess) {
            logger.error(`User registration failed for email: ${email}`);
            return res.sendCommonValue(null, 'Registration failed', 0);
        }

        logger.info(`New user registered: ${email}`);

        return res.status(201).sendCommonValue(
            {
                email: email,
            },
            'Registration successful',
            1
        );
    } catch (err) {
        logger.error(`Register error for email: ${req.body.email}, error: ${err}`);
        return res.sendCommonValue(null, 'Internal server error', 0);
    }
};

const meAsync = async (req, res) => {
    try {
        const user = req.auth;

        if (!user) {
            return res.status(401).sendCommonValue(null, 'Not logged in', 0);
        }

        const result = await userService.getUserByEmailAsync(user.email);

        if (!result.isSuccess) {
            return res.status(404).sendCommonValue(null, 'User does not exist.', 0);
        }

        return res.sendCommonValue(
            {
                id: result.data.id,
                email: result.data.email,
                roles: result.data.roles || [],
            },
            'User information retrieved successfully.',
            1
        );
    } catch (err) {
        logger.error(`Error retrieving user information: ${err}`);
        return res.sendCommonValue(null, 'Internal Server Error', 0);
    }
};

const logoutAsync = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        res.clearCookie('XSRF-TOKEN', {
            secure: true,
            sameSite: 'None',
        });

        return res.sendCommonValue(null, 'Logout successful', 1);
    } catch (err) {
        logger.error(`Logout error: ${err}`);
        return res.sendCommonValue(null, 'Internal server error', 0);
    }
};

module.exports = {
    loginAsync,
    registerAsync,
    logoutAsync,
    meAsync,
};
