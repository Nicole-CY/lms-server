/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.bulkInsert('user_role', [
                {
                    user_id: 1, // SuperAdmin
                    role_id: 1,
                },
                {
                    user_id: 2, // Admin
                    role_id: 2,
                },
            ]);
        } catch (error) {
            console.error('Error inserting into user_role:', error);
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        try {
            await queryInterface.bulkDelete('user_role', null, {});
        } catch (error) {
            console.error('Error deleting from user_role:', error);
            throw error;
        }
    },
};
