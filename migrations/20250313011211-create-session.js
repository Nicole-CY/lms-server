"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Session", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            SessionTitle: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            SessionDescription: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            Order: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            CreatedBy: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            UpdatedBy: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Session");
    },
};