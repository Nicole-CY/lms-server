const jwt = require('jsonwebtoken');

const { User, Role } = require('../models');
const { jwtConfig } = require('../../appConfig');

const setUserFromToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify and decode the token
        const payload = jwt.verify(token, jwtConfig.secret, {
            algorithms: jwtConfig.algorithms,
        });

        // Retrieve the user from the database (including associated roles)
        const user = await User.findByPk(payload.id, {
            include: { model: Role, through: { attributes: [] } },
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Find user's roles
        const userWithRoles = await User.findByPk(user.id, {
            include: { model: Role, through: { attributes: [] } },
        });

        const roleNames = userWithRoles.Roles.map(r => r.roleName);

        // Attach user info to req for use in downstream controllers
        req.user = user;
        req.roles = roleNames;
        req.user.role = roleNames[0] || null;
        next();
    } catch (error) {
        console.error('setUserFromToken error:', error);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = setUserFromToken;
