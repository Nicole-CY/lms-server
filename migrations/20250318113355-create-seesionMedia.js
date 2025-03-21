"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Media", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            sessionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Session",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            fileType: {
                type: Sequelize.ENUM("video", "pdf"),
                allowNull: false,
            },
            fileName: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            filePath: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            thumbnailPath: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            uploaderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            uploadedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            approvalStatus: {
                type: Sequelize.ENUM("Pending", "Approved", "Rejected"),
                allowNull: false,
                defaultValue: "Pending",
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Media");
    },
};
