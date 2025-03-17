'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("courseInstanceUser", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      courseInstanceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      canRead: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      canUpdate: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      canDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("courseInstanceUser");
  }
};
