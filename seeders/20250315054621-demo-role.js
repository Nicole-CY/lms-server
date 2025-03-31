'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.bulkInsert('role', [
                {
                    id: 1,
                    role_name: 'SuperAdmin',
                    description:
                        'Full system control, manages all users, roles, menus, and courses by default. Has full access (CRUD on all resources).',
                },
                {
                    id: 2,
                    role_name: 'Admin',
                    description:
                        'Manages courses, users, and menus but has restricted access (CRUD on assigned resources).',
                },
                {
                    id: 3,
                    role_name: 'Teacher',
                    description:
                        'Manages assigned courses, students, and class content. Has limited access (Read and Modify own content).',
                },
                {
                    id: 4,
                    role_name: 'Student',
                    description:
                        'Can enroll in courses, access course materials, and participate in discussions. Typically has read-only access to course content.',
                },
            ]);
        } catch (error) {
            console.error('Detailed Sequelize Validation Error:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('role', null, {});
    },
};
