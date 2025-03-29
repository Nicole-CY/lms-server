const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const CourseNotification = sequelize.define(
    "courseNotification",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        recipientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "recipient_id",
            references: {
                model: "user",
                key: "id",
            },
        },
        courseOfferingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "course_offering_id",
            references: {
                model: "courseOffering",
                key: "id",
            },
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Unread", "Read"),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at",
            defaultValue: DataTypes.NOW,
        },

    },
    {
        tableName: "course_notification",
        timestamps: false,
        updatedAt: 'updated_at',
    }
);

module.exports = CourseNotification;
