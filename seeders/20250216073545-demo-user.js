'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            // Delete existing users BEFORE inserting new ones
            await queryInterface.bulkDelete('user', null, {});

            await queryInterface.bulkInsert(
                'user',
                [
                    {
                        id: 1, // Explicitly set ID for superadmin
                        email: 'superadmin@example.com',
                        password: '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S',
                        birth_date: '1990-05-20',
                        first_name: 'david',
                        last_name: 'john',
                        gender: 1,
                        avatar: 'https://via.placeholder.com/150',
                        active: true,
                    },
                    {
                        id: 2, // Explicitly set ID for admin
                        email: 'admin@example.com',
                        password: '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S',
                        birth_date: '1990-05-20',
                        first_name: 'peter',
                        last_name: 'anderson',
                        gender: 1,
                        avatar: 'https://via.placeholder.com/150',
                        active: true,
                    },
                ],
                {}
            );
        } catch (error) {
            console.error('Detailed Sequelize Validation Error:', error);
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        try {
            // First, delete all records from tables that reference user
            await queryInterface.bulkDelete('course_instance_user', null, {});
            await queryInterface.bulkDelete('course_instance', null, {});
            await queryInterface.bulkDelete('course', null, {});
            await queryInterface.bulkDelete('category', null, {});
            await queryInterface.bulkDelete('session', null, {});

            // Now we can safely delete users
            await queryInterface.bulkDelete('user', null, {});
        } catch (error) {
            console.error('Error during rollback:', error);
            throw error;
        }
    },
};
