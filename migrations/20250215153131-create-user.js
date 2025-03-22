"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        address: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        birth_date: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        gender: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        avatar: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        roles: {
          type: Sequelize.JSON,
          allowNull: true,
        },
      },
      {
        timestamps: false, // Disable createdAt & updatedAt
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
    console.log("table user droped");
  },
};
