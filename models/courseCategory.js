const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const CourseCategory = sequelize.define(
    'CourseCategory',
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
            field: "course_id",
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "category_id",
        }
    },{
        tableName: "course_category",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

CourseCategory.associate = function(models){
    CourseCategory.belongsTo(models.Course, {foreignKey: "course_id", onDelete: "CASCADE"});
    CourseCategory.belongsTo(models.Category, {foreignKey:"category_id", onDelete: "CASCADE"});
};

module.exports = CourseCategory;
