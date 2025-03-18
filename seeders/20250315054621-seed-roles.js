'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [
      {
        role_name: "SuperAdmin",
        description: "Full system control, manages all users, roles, menus, and courses by default. Has full access (CRUD on all resources).",
      },
      {
        role_name: "Admin",
        description: "Manages courses, users, and menus but has restricted access (CRUD on assigned resources).",
      },
      {
        role_name: "Teacher",
        description: "Manages assigned courses, students, and class content. Has limited access (Read and Modify own content).",
      },
      {
        role_name: "Student",
        description: "Can enroll in courses, access course materials, and participate in discussions. Typically has read-only access to course content.",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
