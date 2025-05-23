'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const instances = [];
        let id = 1;

        for (let courseId = 1; courseId <= 8; courseId++) {
            // spring class (January-April)
            instances.push({
                id: id++,
                course_id: courseId,
                start_date: new Date(`2025-01-15`),
                end_date: new Date(`2025-04-15`),
                total_sessions: 10 + Math.floor(Math.random() * 6), // 10-15
                launch_status: 'Scheduled',
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            });

            // summer class (May-August)
            instances.push({
                id: id++,
                course_id: courseId,
                start_date: new Date(`2025-05-15`),
                end_date: new Date(`2025-08-15`),
                total_sessions: 10 + Math.floor(Math.random() * 6),
                launch_status: 'Scheduled',
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            });

            // autumn class (September-December)
            instances.push({
                id: id++,
                course_id: courseId,
                start_date: new Date(`2025-09-15`),
                end_date: new Date(`2025-12-15`),
                total_sessions: 10 + Math.floor(Math.random() * 6),
                launch_status: 'Scheduled',
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            });

            // spring class (January-April)
            instances.push({
                id: id++,
                course_id: courseId,
                start_date: new Date(`2026-01-15`),
                end_date: new Date(`2026-04-15`),
                total_sessions: 10 + Math.floor(Math.random() * 6),
                launch_status: 'Scheduled',
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            });

            // summer class (May-August)
            instances.push({
                id: id++,
                course_id: courseId,
                start_date: new Date(`2026-05-15`),
                end_date: new Date(`2026-08-15`),
                total_sessions: 10 + Math.floor(Math.random() * 6),
                launch_status: 'In Progress',
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            });

            // autumn class (September-December)
            instances.push({
                id: id++,
                course_id: courseId,
                start_date: new Date(`2026-09-15`),
                end_date: new Date(`2026-12-15`),
                total_sessions: 10 + Math.floor(Math.random() * 6),
                launch_status: 'Completed',
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        await queryInterface.bulkInsert('course_instance', instances, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('course_instance', null, {});
    },
};
