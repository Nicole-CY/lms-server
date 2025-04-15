'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('user', 'roles');
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn('user', 'roles', {
            type: Sequelize.JSON,
            allowNull: true,
        });
    },
};
