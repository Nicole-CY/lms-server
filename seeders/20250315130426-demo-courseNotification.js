'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("CourseNotification", [
      {
        recipient_id: 5,
        course_offering_id: 1,
        message: "Your class starts on April 1st!",
        status: "Unread",
        created_at: new Date(),
      },
      {
        recipient_id: 7,
        course_offering_id: 2,
        message: "Your class starts on June 15th!",
        status: "Read",
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CourseNotification", null, {});
  },
};

