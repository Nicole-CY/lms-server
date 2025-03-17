'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("courseCategory", [
      {
        courseId: 1,  // Associates with the first course
        categoryId: 101  // Example category id
      },
      {
        courseId: 1,
        categoryId: 102  // Another category for the first course
      },
      {
        courseId: 2,
        categoryId: 101  // First course category also assigned to the second course
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courseCategory", null, {});
  }
};
