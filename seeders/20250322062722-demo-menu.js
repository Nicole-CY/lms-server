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

        await queryInterface.bulkInsert(
            'menu',
            [
                {
                    menu_name: 'Dashboard',
                    route_path: '/dashboard',
                },
                {
                    menu_name: 'Data Management',
                    route_path: '/dashboard/data-management',
                },
                {
                    menu_name: 'Course Management',
                    route_path: '/dashboard/course-management',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('course', null, {});
    },
};
