'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'course_instance_user',
            [
                // User 1 (Admin) enrollments
                {
                    course_instance_id: 1, // JavaScript Fundamentals - Spring 2025
                    user_id: 1, // Admin user
                    can_read: true,
                    can_update: true,
                    can_delete: true,
                },
                {
                    course_instance_id: 2, // JavaScript Fundamentals - Fall 2025
                    user_id: 1, // Admin user
                    can_read: true,
                    can_update: true,
                    can_delete: true,
                },
                {
                    course_instance_id: 3, // React.js for Beginners - Summer 2025
                    user_id: 1, // Admin user
                    can_read: true,
                    can_update: true,
                    can_delete: true,
                },
                {
                    course_instance_id: 4, // Node.js Backend Development - Spring 2025
                    user_id: 1, // Admin user
                    can_read: true,
                    can_update: true,
                    can_delete: true,
                },

                // User 2 enrollments
                {
                    course_instance_id: 1, // JavaScript Fundamentals - Spring 2025
                    user_id: 2, // Regular user
                    can_read: true,
                    can_update: false,
                    can_delete: false,
                },
                {
                    course_instance_id: 3, // React.js for Beginners - Summer 2025
                    user_id: 2, // Regular user
                    can_read: true,
                    can_update: false,
                    can_delete: false,
                },
                {
                    course_instance_id: 5, // Python for Data Science - Summer 2025
                    user_id: 2, // Regular user
                    can_read: true,
                    can_update: false,
                    can_delete: false,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('course_instance_user', null, {});
    },
};
