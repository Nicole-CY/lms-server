'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Start transaction
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.bulkInsert(
                'course',
                [
                    // Programming - JavaScript courses
                    {
                        id: 1,
                        title: 'JavaScript Fundamentals',
                        course_code: 'JS101',
                        cover_image: '/images/courses/javascript_basics.jpg',
                        description:
                            'Learn the basics of JavaScript programming language including syntax, variables, and functions',
                        created_by: 1,
                        updated_by: 1,
                    },
                    {
                        id: 2,
                        title: 'React.js for Beginners',
                        course_code: 'REACT101',
                        cover_image: '/images/courses/react_basics.jpg',
                        description:
                            'Build modern user interfaces with React.js - components, state management, and hooks',
                        created_by: 1,
                        updated_by: 1,
                    },
                    {
                        id: 3,
                        title: 'Node.js Backend Development',
                        course_code: 'NODE101',
                        cover_image: '/images/courses/node_basics.jpg',
                        description:
                            'Create powerful backend applications with Node.js - RESTful APIs, database integration, and authentication',
                        created_by: 1,
                        updated_by: 1,
                    },

                    // Programming - Python/Data Science courses
                    {
                        id: 4,
                        title: 'Python for Data Science',
                        course_code: 'PYDS101',
                        cover_image: '/images/courses/python_ds.jpg',
                        description:
                            'Learn Python for data analysis and machine learning with pandas, numpy, and scikit-learn',
                        created_by: 1,
                        updated_by: 1,
                    },
                    {
                        id: 5,
                        title: 'Mobile App Development with React Native',
                        course_code: 'RN101',
                        cover_image: '/images/courses/react_native.jpg',
                        description:
                            'Build cross-platform mobile apps with React Native for iOS and Android',
                        created_by: 1,
                        updated_by: 1,
                    },

                    // Specialized technology courses
                    {
                        id: 6,
                        title: 'Cloud Computing with AWS',
                        course_code: 'AWS101',
                        cover_image: '/images/courses/aws_basics.jpg',
                        description:
                            'Master cloud services with Amazon Web Services - EC2, S3, Lambda, and more',
                        created_by: 1,
                        updated_by: 1,
                    },
                    {
                        id: 7,
                        title: 'Cyber Security Fundamentals',
                        course_code: 'SEC101',
                        cover_image: '/images/courses/security_basics.jpg',
                        description:
                            'Learn the basics of cyber security including threat assessment, encryption, and ethical hacking',
                        created_by: 1,
                        updated_by: 1,
                    },
                    {
                        id: 8,
                        title: 'DevOps with Docker and Kubernetes',
                        course_code: 'DEVOPS101',
                        cover_image: '/images/courses/devops_basics.jpg',
                        description:
                            'Master containerization and orchestration for DevOps workflows with Docker and Kubernetes',
                        created_by: 1,
                        updated_by: 1,
                    },
                ],
                { transaction }
            );

            // Commit the transaction
            await transaction.commit();
        } catch (error) {
            // If any error occurs, rollback the transaction
            await transaction.rollback();
            console.error('Error seeding courses:', error);
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.bulkDelete('course', null, { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Error rolling back courses:', error);
            throw error;
        }
    },
};
