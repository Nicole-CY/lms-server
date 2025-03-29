'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("course_instance_user", [
      // For courseInstance with id 1 (from courseInstance seed)
      {
        course_instance_id: 1,
        user_id: 1,
        can_read: true,
        can_update: false,
        can_delete: false
      },
      {
        course_instance_id: 1,
        user_id: 2,
        can_read: true,
        can_update: false,
        can_delete: false
      },
      // For courseInstance with id 2 (another instance of course 1)
      {
        course_instance_id: 2,
        user_id: 1,
        can_read: true,
        can_update: true,
        can_delete: false
      },
      // For courseInstance with id 3 (instance of course 2)
      {
        course_instance_id: 3,
        user_id: 1,
        can_read: true,
        can_update: false,
        can_delete: false
      },
      {
        course_instance_id: 3,
        user_id: 2,
        can_read: true,
        can_update: true,
        can_delete: true
      }
    ], {});
  },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('course_instance_user', null, {});
    },
};
