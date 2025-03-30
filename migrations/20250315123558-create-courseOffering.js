"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('course_offering', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      course_instance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "course_instance",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      student_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Pending Start", "Active", "Completed"),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("course_offering");
  },
};
