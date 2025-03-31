'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("course_instance_user", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      course_instance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "course_instance",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      can_read: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      can_update: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      can_delete: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    });
  },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('course_instance_user');
    },
};
