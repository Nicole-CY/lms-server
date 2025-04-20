const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const CourseOffering = sequelize.define(
    'CourseOffering',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        courseInstanceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'course_instance_id',
            references: {
                model: 'course_instance',
                key: 'id',
            },
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'teacher_id',
            references: {
                model: 'user',
                key: 'id',
            },
        },
        startDate: {
            type: DataTypes.DATE,
            field: 'start_date',
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'end_date',
        },
        studentCapacity: {
            type: DataTypes.INTEGER,
            field: 'student_capacity',
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Pending Start', 'Active', 'Completed'),
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
            references: {
                model: 'user',
                key: 'id',
            },
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            field: 'updated_by',
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        tableName: 'course_offering',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = CourseOffering;
