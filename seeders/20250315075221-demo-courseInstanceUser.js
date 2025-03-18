'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("courseInstanceUser", [
      // For courseInstance with id 1 (from courseInstance seed)
      {
        courseInstanceId: 1,
        userId: 1,
        canRead: true,
        canUpdate: false,
        canDelete: false
      },
      {
        courseInstanceId: 1,
        userId: 2,
        canRead: true,
        canUpdate: false,
        canDelete: false
      },
      // For courseInstance with id 2 (another instance of course 1)
      {
        courseInstanceId: 2,
        userId: 1,
        canRead: true,
        canUpdate: true,
        canDelete: false
      },
      // For courseInstance with id 3 (instance of course 2)
      {
        courseInstanceId: 3,
        userId: 3,
        canRead: true,
        canUpdate: false,
        canDelete: false
      },
      {
        courseInstanceId: 3,
        userId: 1,
        canRead: true,
        canUpdate: true,
        canDelete: true
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courseInstanceUser", null, {});
  }
};
