'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Start transaction
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.bulkInsert(
                'course_category',
                [
                    // =============================================
                    // PROGRAMMING COURSES
                    // =============================================

                    // Course 1: JavaScript Fundamentals
                    {
                        course_id: 1,
                        category_id: 1, // Programming (parent)
                    },
                    {
                        course_id: 1,
                        category_id: 6, // JavaScript (child of Programming)
                    },

                    // Course 2: React.js for Beginners
                    {
                        course_id: 2,
                        category_id: 1, // Programming (parent)
                    },
                    {
                        course_id: 2,
                        category_id: 6, // JavaScript (child of Programming)
                    },
                    {
                        course_id: 2,
                        category_id: 7, // React (child of JavaScript)
                    },

                    // Course 3: Node.js Backend Development
                    {
                        course_id: 3,
                        category_id: 1, // Programming (parent)
                    },
                    {
                        course_id: 3,
                        category_id: 6, // JavaScript (child of Programming)
                    },
                    {
                        course_id: 3,
                        category_id: 8, // Node.js (child of JavaScript)
                    },

                    // Course 4: Python for Data Science
                    {
                        course_id: 4,
                        category_id: 1, // Programming (parent)
                    },
                    {
                        course_id: 4,
                        category_id: 4, // Data Science (parent)
                    },
                    {
                        course_id: 4,
                        category_id: 5, // Python (child of Data Science)
                    },

                    // Course 5: Mobile App Development with React Native
                    {
                        course_id: 5,
                        category_id: 1, // Programming (parent)
                    },
                    {
                        course_id: 5,
                        category_id: 3, // Mobile Development (child of Programming)
                    },
                    {
                        course_id: 5,
                        category_id: 7, // React (child of JavaScript)
                    },

                    // =============================================
                    // SPECIALIZED TECHNOLOGY COURSES
                    // =============================================

                    // Course 6: Cloud Computing with AWS
                    {
                        course_id: 6,
                        category_id: 10, // Cloud Computing (parent)
                    },

                    // Course 7: Cyber Security Fundamentals
                    {
                        course_id: 7,
                        category_id: 11, // Cybersecurity (parent)
                    },

                    // Course 8: DevOps with Docker and Kubernetes
                    {
                        course_id: 8,
                        category_id: 12, // DevOps (parent)
                    },
                ],
                { transaction }
            );

            // Commit the transaction
            await transaction.commit();
        } catch (error) {
            // If any error occurs, rollback the transaction
            await transaction.rollback();
            console.error('Error seeding course categories:', error);
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.bulkDelete('course_category', null, { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Error rolling back course categories:', error);
            throw error;
        }
    },
};
