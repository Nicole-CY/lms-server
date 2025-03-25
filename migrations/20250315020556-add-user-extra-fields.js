"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user", "avatar", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.addColumn("user", "active", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });

    await queryInterface.addColumn("user", "roles", {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("user", "avatar");
    await queryInterface.removeColumn("user", "active");
    await queryInterface.removeColumn("user", "roles");
  },
};
