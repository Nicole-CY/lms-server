const { sequelize } = require('../../models');

async function connectTestDB() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log('Test DB connected and synced');
    } catch (err) {
        console.error('Failed to connect test DB:', err);
    }
}

async function disconnectTestDB() {
    await sequelize.close();
    console.log('Test DB disconnected');
}

module.exports = { connectTestDB, disconnectTestDB };
