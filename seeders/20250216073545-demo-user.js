"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Delete existing users BEFORE inserting new ones
      await queryInterface.bulkDelete("user", null, {});

      await queryInterface.bulkInsert(
        "user",
        [
          {
            email: "superadmin@example.com",
            password:
              "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
            birth_date: '1990-05-20',
            first_name: "david",
            last_name: "john",
            gender: 1,
            avatar: "https://via.placeholder.com/150",
            active: true,
            roles: JSON.stringify(["super_admin", "user"]),
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            email: "admin@example.com",
            password:
              "$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S",
            birth_date: '1990-05-20',
            first_name: "peter",
            last_name: "anderson",
            gender: 1,
            avatar: "https://via.placeholder.com/150",
            active: true,
            roles: JSON.stringify(["admin", "user"]),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {}
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
      await queryInterface.bulkDelete("user", null, {});

      // Drop the users table if needed
      await queryInterface.dropTable("user");
    } catch (error) {
      console.error("Error during rollback:", error);
      throw error;
    }
  },
};
