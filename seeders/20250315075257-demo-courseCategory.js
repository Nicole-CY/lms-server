'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("course_category", [
      {
        course_id: 1,  // Introduction to Node.js
        category_id: 1  // Programming
      },
      {
        course_id: 1,
        category_id: 2  // Web Development
      },
      {
        course_id: 2,  // Advanced Sequelize
        category_id: 1  // Programming
      }
    ], {});
  },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('course_category', null, {});
    },
};
