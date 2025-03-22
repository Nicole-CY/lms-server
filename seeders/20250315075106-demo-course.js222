'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("course", [
      {
        title: "Introduction to Node.js",
        courseCode: "NODE101",
        coverImage: "node101.jpg",
        description: "Learn the basics of Node.js",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1
      },
      {
        title: "Advanced Sequelize",
        courseCode: "SEQL202",
        coverImage: "sequelize.jpg",
        description: "Master Sequelize ORM for advanced database handling",
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("course", null, {});
  }
};
