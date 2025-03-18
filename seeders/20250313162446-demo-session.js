"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Session", [
            {
                SissionTitle: "Introduction to Data Science",
                SessionDescription: "What is the Data Science in our life?",
                Order: null,
                CreatedBy: 1,
                UpdatedBy: 1,
                CreatedAt: new Date(),
                UpdatedAt: new Date(),
            },
            {
                SissionTitle: "Data Science 2",
                SessionDescription: "How to use Data Science in our life?",
                Order: null,
                CreatedBy: 1,
                UpdatedBy: 1,
                CreatedAt: new Date(),
                UpdatedAt: new Date(),
            },
            {
                SissionTitle: "Data Science 3",
                SessionDescription: "What is the Data Science 3?",
                Order: null,
                CreatedBy: 1,
                UpdatedBy: 1,
                CreatedAt: new Date(),
                UpdatedAt: new Date(),
            },
            {
                SissionTitle: "Data Science 4",
                SessionDescription: "What is the Data Science 4?",
                Order: null,
                CreatedBy: 1,
                UpdatedBy: 1,
                CreatedAt: new Date(),
                UpdatedAt: new Date(),
            },
            {
                SissionTitle: "Data Science 5",
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