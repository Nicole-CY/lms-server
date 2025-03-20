'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("CourseOffering", [
      {
        course_instance_id: 1,
        teacher_id: 2,
        start_date: new Date("2025-04-01"),
        student_capacity: 50,
        status: "Active",
      },
      {
        course_instance_id: 2,
        teacher_id: 3,
        start_date: new Date("2025-06-15"),
        student_capacity: 30,
        status: "Pending Start",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CourseOffering", null, {});
  },
};
