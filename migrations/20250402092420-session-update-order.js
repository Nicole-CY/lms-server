'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('session', {
            fields: ['course_instance_id', 'order'],
            type: 'unique',
            name: 'unique_courseInstanceId_order',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('session', 'session_ibfk_1');

        await queryInterface.removeIndex('session', 'unique_courseInstanceId_order');

        await queryInterface.addConstraint('session', {
            fields: ['course_instance_id'],
            type: 'foreign key',
            name: 'session_ibfk_1',
            references: {
                table: 'course_instance',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    },
};
