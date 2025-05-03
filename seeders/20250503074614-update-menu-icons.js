'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkUpdate(
            'menu',
            {
                icon: 'dashboard',
                updated_at: now,
            },
            { menu_name: 'Dashboard' }
        );

        await queryInterface.bulkUpdate(
            'menu',
            {
                icon: 'data',
                updated_at: now,
            },
            { menu_name: 'Data Management' }
        );

        await queryInterface.bulkUpdate(
            'menu',
            {
                icon: 'course',
                updated_at: now,
            },
            { menu_name: 'Course Management' }
        );
    },

    async down(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkUpdate(
            'menu',
            {
                icon: null,
                updated_at: now,
            },
            {
                menu_name: ['Dashboard', 'Data Management', 'Course Management'],
            }
        );
    },
};
