'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("CourseOffering", {
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
          model: "CourseInstance",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "User",
        //   key: "id",
        // },
        // onDelete: "SET NULL",
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CourseOffering");
  }
};
