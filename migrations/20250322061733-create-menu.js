'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('menu', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            menu_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            parent_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'menu',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            route_path: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            component_path: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'Front-end component path',
            },
            menu_type: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'page',
                comment: 'Type of menu (page/menuItem/subMenu/button)',
            },
            sort_order: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: 'Sort order of menu in UI',
            },
            permission: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'Permission code required to access this menu',
            },
            icon: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'Icon name for menu item',
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('menu');
    },
};
