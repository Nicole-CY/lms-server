'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'role_menu',
            [
                {
                    role_id: 1,
                    menu_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 4,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 5,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 6,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 7,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 8,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 9,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 10,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 11,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 12,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 13,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 14,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 15,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 16,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 17,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 18,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 19,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 20,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 21,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 22,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 23,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 24,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 25,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 26,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    role_id: 1,
                    menu_id: 27,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role_menu', null, {});
    },
};
