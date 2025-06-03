'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('category', [
            {
                id: 1,
                category_name: 'Programming',
                description: 'Learn various programming languages',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/programming.png',
            },
            {
                id: 2,
                category_name: 'Web Development',
                description: 'Courses on front-end and back-end development',
                parent_id: 1,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/web-dev.png',
            },
            {
                id: 3,
                category_name: 'Mobile Development',
                description: 'Build apps for Android and iOS',
                parent_id: 1,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/mobile.png',
            },
            {
                id: 4,
                category_name: 'Data Science',
                description: 'Machine learning, AI, and data analysis',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/data-science.png',
            },
            {
                id: 5,
                category_name: 'Python',
                description: 'Learn Python programming',
                parent_id: 4,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/python.png',
            },
            {
                id: 6,
                category_name: 'JavaScript',
                description: 'Master JavaScript and frameworks',
                parent_id: 1,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/javascript.png',
            },
            {
                id: 7,
                category_name: 'React',
                description: 'Learn React.js for front-end development',
                parent_id: 6,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/react.png',
            },
            {
                id: 8,
                category_name: 'Node.js',
                description: 'Backend development with Node.js',
                parent_id: 6,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/node.png',
            },
            {
                id: 9,
                category_name: 'Artificial Intelligence',
                description: 'AI and deep learning',
                parent_id: 4,
                created_by: 1,
                updated_by: 1,
                icon_url: 'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/ai.png',
            },
            {
                id: 10,
                category_name: 'Cloud Computing',
                description: 'AWS, Azure, and Google Cloud',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/cloud.png',
            },
            {
                id: 11,
                category_name: 'Cybersecurity',
                description: 'Ethical hacking and network security',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/cyber.png',
            },
            {
                id: 12,
                category_name: 'DevOps',
                description: 'CI/CD, Docker, and Kubernetes',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/devops.png',
            },
            {
                id: 13,
                category_name: 'Business Analytics',
                description: 'Data analytics for businesses',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/analytics.png',
            },
            {
                id: 14,
                category_name: 'Graphic Design',
                description: 'UI/UX and visual design',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/app-store.png',
            },
            {
                id: 15,
                category_name: 'Digital Marketing',
                description: 'SEO, social media, and PPC',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/digital.png',
            },
            {
                id: 16,
                category_name: 'Blockchain',
                description: 'Cryptocurrency and smart contracts',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/blockchain.png',
            },
            {
                id: 17,
                category_name: 'Game Development',
                description: 'Unity and Unreal Engine courses',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/game.png',
            },
            {
                id: 18,
                category_name: 'Mathematics',
                description: 'Algebra, calculus, and statistics',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/math.png',
            },
            {
                id: 19,
                category_name: 'Finance',
                description: 'Stock trading and financial analysis',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/finance.png',
            },
            {
                id: 20,
                category_name: 'Writing',
                description: 'Creative and technical writing',
                parent_id: null,
                created_by: 1,
                updated_by: 1,
                icon_url:
                    'https://mooc-2025.s3.ap-southeast-2.amazonaws.com/category-icons/writing.png',
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('category', null, {});
    },
};
