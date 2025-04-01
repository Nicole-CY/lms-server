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
            field: 'course_code',
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
            field: 'cover_image',
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
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
        tableName: 'course',
        timestamps: true, // automatic insertion and maintenance for createdAt/updatedAt
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Course.associate = function (models) {
    Course.hasMany(models.CourseInstance, { foreignKey: 'course_id', onDelete: 'CASCADE' });
    Course.hasMany(models.CourseCategory, { foreignKey: 'course_id', onDelete: 'CASCADE' });
};
module.exports = Course;
