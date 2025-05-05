'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('menu', 'icon', {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Icon name for menu item',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('menu', 'icon');
    },
};
