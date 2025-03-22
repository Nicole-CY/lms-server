"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("permissions", [
      {
        id: 1,
        name: "READ_USER",
        description: "Read user data",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "WRITE_USER",
        description: "Write user data",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "DELETE_USER",
        description: "Delete user data",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
