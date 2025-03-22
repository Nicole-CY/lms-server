"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Delete existing users BEFORE inserting new ones
      await queryInterface.bulkDelete("users", null, {});

      await queryInterface.bulkInsert(
        "users",
        [
          {
            id: 1,
            username: "superadmin",
            password:
              "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
            email: "superadmin@example.com",
            birth_date: "1990-05-20",
            gender: 1,
            avatar: "https://via.placeholder.com/150",
            active: true,
            roles: JSON.stringify(["super_admin", "user"]),
          },
          {
            id: 2,
            username: "admin",
            password:
              "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
            email: "admin@example.com",
            birth_date: "1990-05-20",
            gender: 1,
            avatar: "https://via.placeholder.com/150",
            active: true,
            roles: JSON.stringify(["admin", "user"]),
          },
        ],
        { timestamps: false }
      );
    } catch (error) {
      console.error("Detailed Sequelize Validation Error:", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Delete dependent rows from child tables before deleting users
      await queryInterface.bulkDelete("category", { createdBy: 1 }, {});
      await queryInterface.bulkDelete("session", { createdBy: 1 }, {});

      // Now delete users
      await queryInterface.bulkDelete("users", null, {});

      // Drop the users table if needed
      await queryInterface.dropTable("users");
    } catch (error) {
      console.error("Error during rollback:", error);
      throw error;
    }
  },
};
