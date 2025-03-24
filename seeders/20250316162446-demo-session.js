"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
<<<<<<< HEAD
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("sessions", [
            {
                course_instance_id: 1,
                session_title: "Introduction to Data Science",
                session_description: "What is the Data Science in our life?",
                order: 1,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                course_instance_id: 1,
                session_title: "Data Science 2",
                session_description: "How to use Data Science in our life?",
                order: 2,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                course_instance_id: 1,
                session_title: "Data Science 3",
                session_description: "What is the Data Science 3?",
                order: 3,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                course_instance_id: 1,
                session_title: "Data Science 4",
                session_description: "What is the Data Science 4?",
                order: 4,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                course_instance_id: 1,
                session_title: "Data Science 5",
                session_description: "What is the Data Science 5?",
                order: 5,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("sessions", null, {});
    },
};
=======
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Session", [
      {
        id: 1,
        courseInstanceId: 1,
        SessionTitle: "Introduction to Data Science",
        SessionDescription: "What is the Data Science in our life?",
        Order: null,
        CreatedBy: 1,
        UpdatedBy: 1,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: 2,
        courseInstanceId: 1,
        SessionTitle: "Data Science 2",
        SessionDescription: "How to use Data Science in our life?",
        Order: null,
        CreatedBy: 1,
        UpdatedBy: 1,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: 3,
        courseInstanceId: 1,
        SessionTitle: "Data Science 3",
        SessionDescription: "What is the Data Science 3?",
        Order: null,
        CreatedBy: 1,
        UpdatedBy: 1,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: 4,
        courseInstanceId: 1,
        SessionTitle: "Data Science 4",
        SessionDescription: "What is the Data Science 4?",
        Order: null,
        CreatedBy: 1,
        UpdatedBy: 1,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
      {
        id: 5,
        courseInstanceId: 1,
        SessionTitle: "Data Science 5",
        SessionDescription: "What is the Data Science 5?",
        Order: null,
        CreatedBy: 1,
        UpdatedBy: 1,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Session", null, {});
  },
};
>>>>>>> dev
