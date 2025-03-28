const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const Course = sequelize.define(
    'Course',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        courseCode: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
    },
    {
        tableName: 'Course',
        timestamps: false, // avoid automatic insertion and maintenance for createdAt/updatedAt
    }
);

Course.associate = function (models) {
    Course.hasMany(models.CourseInstance, { foreignKey: 'courseId', onDelete: 'CASCADE' });
    Course.hasMany(models.CourseCategory, { foreignKey: 'courseId', onDelete: 'CASCADE' });
};
module.exports = Course;
