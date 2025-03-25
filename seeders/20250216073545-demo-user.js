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
          email: "superadmin@example.com",
          password:
            "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
          birth_date: '1990-05-20',
          gender: 1,
          avatar: "https://via.placeholder.com/150",
          active: true,
          roles: JSON.stringify(["super_admin", "user"]),
        },
        {
          email: "admin@example.com",
          password:
            "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
          birth_date: '1990-05-20',
          gender: 1,
          avatar: "https://via.placeholder.com/150",
          active: true,
          roles: JSON.stringify(["admin", "user"]),
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