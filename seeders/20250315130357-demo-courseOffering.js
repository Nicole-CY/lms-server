'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('course_offering', [
            {
                id: 1,
                course_instance_id: 1,
                teacher_id: 1,
                max_students: 50,
                status: 'Active',
                created_by: 1,
                updated_by: 1,
            },
            {
                id: 2,
                course_instance_id: 2,
                teacher_id: 2,
                max_students: 30,
                status: 'Pending Start',
                created_by: 1,
                updated_by: 1,
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('course_offering', null, {});
    },
};
