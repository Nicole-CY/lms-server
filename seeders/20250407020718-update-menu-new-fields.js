'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const now = new Date();

        await queryInterface.bulkUpdate(
            'menu',
            {
                component_path: 'Dashboard',
                menu_type: 'page',
                sort_order: 1,
                updated_at: now,
            },
            { menu_name: 'Dashboard' }
        );

        await queryInterface.bulkUpdate(
            'menu',
            {
                component_path: 'DataManagement',
                menu_type: 'page',
                sort_order: 2,
                updated_at: now,
            },
            { menu_name: 'Data Management' }
        );

        await queryInterface.bulkUpdate(
            'menu',
            {
                component_path: 'CourseManagement',
                menu_type: 'page',
                sort_order: 3,
                updated_at: now,
            },
            { menu_name: 'Course Management' }
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        const now = new Date();

        await queryInterface.bulkUpdate(
            'menu',
            {
                component_path: null,
                menu_type: 'page',
                sort_order: 0,
                updated_at: now,
            },
            {
                menu_name: ['Dashboard', 'Data Management', 'Course Management'],
            }
        );
    },
};
