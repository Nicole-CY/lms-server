'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable("roles", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        role_name: { type: Sequelize.STRING(50), unique: true, allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: true }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("roles");
  }
};
