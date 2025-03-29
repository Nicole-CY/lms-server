"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "course_category",
      [
        {
          courseId: 1, // "Introduction to Node.js"
          categoryId: 8, // "Node.js"
        },
        {
          courseId: 1,
          categoryId: 6, // "JavaScript"
        },
        {
          courseId: 2, // "Advanced Sequelize"
          categoryId: 1, // "Programming"
        },
        {
          courseId: 2,
          categoryId: 4, // "Data Science"
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("course_category", null, {});
  },
};
