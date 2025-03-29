const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../../appConfig');

function generateToken(user = {
    id: 1,
    role: ['superadmin'],
    email: 'superadmin@example.com',
}) {
    return jwt.sign(user, jwtConfig.secret, {
        expiresIn: `${jwtConfig.expiresIn}s`,
    });
}

module.exports = { generateToken };
