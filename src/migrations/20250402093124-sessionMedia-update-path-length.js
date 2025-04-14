'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('media', 'file_path', {
            type: Sequelize.TEXT,
            allowNull: false,
        });

        await queryInterface.changeColumn('media', 'thumbnail_path', {
            type: Sequelize.TEXT,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('media', 'file_path', {
            type: Sequelize.STRING(255),
            allowNull: false,
        });

        await queryInterface.changeColumn('media', 'thumbnail_path', {
            type: Sequelize.STRING(255),
            allowNull: true,
        });
    },
};
