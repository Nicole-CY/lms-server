'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('role_menu', {
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'role',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            menu_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'menu',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('role_menu');
    },
};
