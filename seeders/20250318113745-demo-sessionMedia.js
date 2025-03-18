"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Media",
            [
                {
                    sessionId: 1,
                    fileType: "video",
                    fileName: "lesson1.mp4",
                    filePath: "/uploads/videos/lesson1.mp4",
                    thumbnailPath: "/uploads/thumbnails/lesson1.jpg",
                    uploaderId: 1,
                    uploadedAt: new Date(),
                    approvalStatus: "Approved",
                },
                {
                    sessionId: 2,
                    fileType: "pdf",
                    fileName: "lecture-notes.pdf",
                    filePath: "/uploads/pdfs/lecture-notes.pdf",
                    thumbnailPath: null,
                    uploaderId: 1,
                    uploadedAt: new Date(),
                    approvalStatus: "Pending",
                },
                {
                    sessionId: 1,
                    fileType: "video",
                    fileName: "lesson2.mp4",
                    filePath: "/uploads/videos/lesson2.mp4",
                    thumbnailPath: "/uploads/thumbnails/lesson2.jpg",
                    uploaderId: 1,
                    uploadedAt: new Date(),
                    approvalStatus: "Approved",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Media", null, {});
    },
};
