const { sequelize } = require('../src/db/sequelizedb');

beforeAll(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
});

afterAll(async () => {
    await sequelize.close();
});
