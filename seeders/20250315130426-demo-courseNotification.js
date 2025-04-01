'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('course_notification', [
            {   
                id: 1,
                recipient_id: 1,
                course_offering_id: 1,
                message: 'Your class starts on April 1st!',
                status: 'Unread',
            },
            {   
                id: 2,
                recipient_id: 2,
                course_offering_id: 2,
                message: 'Your class starts on June 15th!',
                status: 'Read',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('course_notification', null, {});
    },
};
