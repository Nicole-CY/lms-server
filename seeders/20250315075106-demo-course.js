'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "course",
      [
        {
          id: 1,
          title: "Introduction to Node.js",
          course_code: "NODE101",
          cover_image: "node101.jpg",
          description: "Learn the basics of Node.js, from setting up a server to building basic APIs.",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
        },
        {
          id: 2,
          title: "Advanced Sequelize",
          course_code: "SEQL202",
          cover_image: "sequelize.jpg",
          description: "Master Sequelize ORM for advanced database handling, including associations and migrations.",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
        },
        {
          id: 3,
          title: "React for Beginners",
          course_code: "REACT101",
          cover_image: "react101.jpg",
          description: "A beginner-friendly course that teaches you how to build interactive UIs with React.",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
        },
        {
          id: 4,
          title: "Database Design with MySQL",
          course_code: "DBDES301",
          cover_image: "mysql.jpg",
          description: "Learn the principles of database design and how to optimize queries in MySQL.",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
        },
        {
          id: 5,
          title: "Introduction to Python",
          course_code: "PY101",
          cover_image: "python101.jpg",
          description: "Start learning Python, one of the most popular programming languages in the world.",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
        },
        {
          id: 6,
          title: "Web Development with Django",
          course_code: "DJANGO202",
          cover_image: "django.jpg",
          description: "Learn to build robust and scalable web applications using the Django framework in Python.",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
        },
        {
          id: 7,
          title: "Understanding Machine Learning",
          course_code: "ML101",
          cover_image: "ml101.jpg",
          description: "An introductory course to machine learning concepts and algorithms using Python.",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
        },
        {
          id: 8,
          title: "Building RESTful APIs with Express",
          course_code: "EXPRESS301",
          cover_image: "express.jpg",
          description: "Learn how to build scalable RESTful APIs using Express.js and Node.js.",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 1,
          updated_by: 1,
        },
      ],
      {}
    );
  },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('course', null, {});
    },
};