'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('course_offering', [
            {
                id: 1,
                course_instance_id: 1,
                teacher_id: 1,
                student_capacity: 50,
                start_date: new Date('2025-03-01'),
                end_date: new Date('2025-05-30'),
                status: 'Scheduled',
                created_by: 1,
                updated_by: 1,
            },
            {
                id: 2,
                course_instance_id: 2,
                teacher_id: 2,
                student_capacity: 30,
                start_date: new Date('2025-01-01'),
                end_date: new Date('2025-03-30'),
                status: 'In Progress',
                created_by: 1,
                updated_by: 1,
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('course_offering', null, {});
    },
};
