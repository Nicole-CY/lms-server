'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("course_instance", [
      // Two instances for course with id 1
      {
        id: 1,
        course_id: 1,
        start_date: new Date("2025-04-01"),
        end_date: new Date("2025-04-30"),
        total_sessions: 12,
        launch_status: "Scheduled",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
        updated_by: 1
      },
      {
        id: 2,
        course_id: 1,
        start_date: new Date("2025-10-01"),
        end_date: new Date("2025-10-30"),
        total_sessions: 12,
        launch_status: "Scheduled",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
        updated_by: 1
      },
      // One instance for course with id 2
      {
        id: 3,
        course_id: 2,
        start_date: new Date("2025-05-01"),
        end_date: new Date("2025-05-30"),
        total_sessions: 15,
        launch_status: "In Progress",
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 1,
        updated_by: 1
      }
    ], {});
  },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('course_instance', null, {});
    },
};
