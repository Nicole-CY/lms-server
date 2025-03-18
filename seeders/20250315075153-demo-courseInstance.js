'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("courseInstance", [
      // Two instances for course with id 1
      {
        courseId: 1,
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-04-30"),
        totalSessions: 12,
        launchStatus: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1
      },
      {
        courseId: 1,
        startDate: new Date("2025-10-01"),
        endDate: new Date("2025-10-30"),
        totalSessions: 12,
        launchStatus: "Scheduled",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1
      },
      // One instance for course with id 2
      {
        courseId: 2,
        startDate: new Date("2025-05-01"),
        endDate: new Date("2025-05-30"),
        totalSessions: 15,
        launchStatus: "In Progress",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courseInstance", null, {});
  }
};
