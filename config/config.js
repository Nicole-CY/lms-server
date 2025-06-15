const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

console.log('✅ Loaded env from', envFile);

const { mysqlConfig } = require('../appConfig');

module.exports = {
    development: {
        host: mysqlConfig.host,
        port: mysqlConfig.port,
        username: mysqlConfig.user,
        password: mysqlConfig.password,
        database: mysqlConfig.database,
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        migrationStorageTableName: 'sequelize_meta',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        seederStorage: 'sequelize',
        seederStorageTableName: 'sequelize_data',
    },
    test: {
        host: mysqlConfig.host,
        port: mysqlConfig.port,
        username: mysqlConfig.user,
        password: mysqlConfig.password,
        database: mysqlConfig.database,
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        migrationStorageTableName: 'sequelize_meta',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        logging: false,
    },
};
