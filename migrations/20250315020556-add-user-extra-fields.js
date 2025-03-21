"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "avatar", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.addColumn("users", "active", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("users", "roles", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "avatar");
    await queryInterface.removeColumn("users", "active");
    await queryInterface.removeColumn("users", "roles");
  },
};
