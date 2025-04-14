'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'course_instance',
            [
                // JavaScript Fundamentals - Spring 2025
                {
                    id: 1,
                    course_id: 1, // JavaScript Fundamentals
                    start_date: new Date('2025-03-01'),
                    end_date: new Date('2025-05-30'),
                    total_sessions: 12,
                    launch_status: 'Scheduled',
                    created_by: 1,
                    updated_by: 1,
                },
                // JavaScript Fundamentals - Fall 2025
                {
                    id: 2,
                    course_id: 1, // JavaScript Fundamentals
                    start_date: new Date('2025-09-01'),
                    end_date: new Date('2025-11-30'),
                    total_sessions: 12,
                    launch_status: 'Scheduled',
                    created_by: 1,
                    updated_by: 1,
                },
                // React.js for Beginners - Summer 2025
                {
                    id: 3,
                    course_id: 2, // React.js for Beginners
                    start_date: new Date('2025-06-01'),
                    end_date: new Date('2025-08-15'),
                    total_sessions: 10,
                    launch_status: 'Scheduled',
                    created_by: 1,
                    updated_by: 1,
                },
                // Node.js Backend Development - Spring 2025
                {
                    id: 4,
                    course_id: 3, // Node.js Backend Development
                    start_date: new Date('2025-03-15'),
                    end_date: new Date('2025-06-15'),
                    total_sessions: 12,
                    launch_status: 'Scheduled',
                    created_by: 1,
                    updated_by: 1,
                },
                // Python for Data Science - Summer 2025
                {
                    id: 5,
                    course_id: 4, // Python for Data Science
                    start_date: new Date('2025-06-15'),
                    end_date: new Date('2025-09-15'),
                    total_sessions: 14,
                    launch_status: 'Scheduled',
                    created_by: 1,
                    updated_by: 1,
                },
                // Mobile App Development with React Native - Fall 2025
                {
                    id: 6,
                    course_id: 5, // Mobile App Development with React Native
                    start_date: new Date('2025-09-15'),
                    end_date: new Date('2025-12-15'),
                    total_sessions: 15,
                    launch_status: 'Scheduled',
                    created_by: 1,
                    updated_by: 1,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('course_instance', null, {});
    },
};
