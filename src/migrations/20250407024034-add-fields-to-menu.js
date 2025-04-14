'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('menu', 'component_path', {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Front-end component path',
        });

        await queryInterface.addColumn('menu', 'menu_type', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'page',
            comment: 'Type of menu (page/group/button)',
        });

        await queryInterface.addColumn('menu', 'sort_order', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: 'Sort order of menu in UI',
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('menu', 'component_path');
        await queryInterface.removeColumn('menu', 'menu_type');
        await queryInterface.removeColumn('menu', 'sort_order');
    },
};
