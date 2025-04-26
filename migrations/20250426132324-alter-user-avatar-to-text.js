'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.changeColumn('user', 'avatar', {
            type: Sequelize.TEXT('medium'),
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.changeColumn('user', 'avatar', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });
    },
};
