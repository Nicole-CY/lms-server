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
        studentCapacity: {
            type: DataTypes.INTEGER,
            field: 'student_capacity',
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Pending Start', 'Active', 'Completed'),
            allowNull: false,
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
