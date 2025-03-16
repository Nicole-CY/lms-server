"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "user",
      [
        {
          username: "superadmin",
          password:
            "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
          email: "defaultuser@example.com",
          age: 30,
          gender: 1,
          avatar: "https://via.placeholder.com/150",
          nickname: "default",
          active: true,
          access: "user",
        },
        {
          username: "admin",
          password:
            "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
          email: "admin@example.com",
          age: 30,
          gender: 1,
          avatar: "https://via.placeholder.com/150",
          nickname: "default",
          active: true,
          access: "user",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    //  await queryInterface.bulkDelete("user", null, {});
    await queryInterface.bulkDelete("user", null, {});
    // delete table if necessary   to use reset-db command in package.json
    await queryInterface.dropTable("user");
  },
};