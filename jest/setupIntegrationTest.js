const { sequelize } = require('../src/db/sequelizedb');
const redis = require('../src/utils/redis');

beforeAll(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
});

afterAll(async () => {
    await redis.quit();
    await sequelize.close();
});
