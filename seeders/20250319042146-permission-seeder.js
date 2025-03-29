'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('permission', [
            {
                id: 1,
                name: 'READ_USER',
                description: 'Read user data',
            },
            {
                id: 2,
                name: 'WRITE_USER',
                description: 'Write user data',
            },
            {
                id: 3,
                name: 'DELETE_USER',
                description: 'Delete user data',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('permission', null, {});
    },
};
