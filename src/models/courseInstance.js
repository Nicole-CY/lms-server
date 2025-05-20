const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const CourseInstance = sequelize.define(
    'CourseInstance',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'course_id',
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'start_date',
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'end_date',
        },
        totalSessions: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'total_sessions',
        },
        launchStatus: {
            type: DataTypes.ENUM('Scheduled', 'In Progress', 'Completed', 'Cancelled'),
            allowNull: true,
            field: 'launch_status',
        },
        createdBy: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        tableName: 'course_instance',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
CourseInstance.associate = function (models) {
    CourseInstance.belongsTo(models.Course, { foreignKey: 'course_id' });
    CourseInstance.hasMany(models.Session, {
        foreignKey: 'course_instance_id', // adjust to match column
    });
};
module.exports = CourseInstance;
