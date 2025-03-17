"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user", "avatar", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn("user", "nickname", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn("user", "active", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
    await queryInterface.addColumn("user", "access", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("user", "avatar");
    await queryInterface.removeColumn("user", "nickname");
    await queryInterface.removeColumn("user", "active");
    await queryInterface.removeColumn("user", "access");
  },
};
