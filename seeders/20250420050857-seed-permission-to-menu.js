'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        await queryInterface.bulkUpdate(
            'menu',
            {
                permission: 'menu:dashboard',
                updated_at: now,
            },
            { menu_name: 'Dashboard' }
        );

        await queryInterface.bulkUpdate(
            'menu',
            {
                permission: 'menu:data-management',
                updated_at: now,
            },
            { menu_name: 'Data Management' }
        );

        await queryInterface.bulkUpdate(
            'menu',
            {
                permission: 'menu:course-management',
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
                permission: null,
                updated_at: now,
            },
            {
                menu_name: ['Dashboard', 'Data Management', 'Course Management'],
            }
        );
    },
};
