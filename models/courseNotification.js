const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const CourseNotification = sequelize.define(
    'CourseNotification',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        recipient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        course_offering_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'course_offering',
                key: 'id',
            },
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Unread', 'Read'),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'course_notification',
        timestamps: false,
    }
);

module.exports = CourseNotification;
