const  {DataTypes} = require("sequelize");
const {sequelize} = require("../db/sequelizedb");

const CourseCategory = sequelize.define(
    "CourseCategory", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        courseId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoryId:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        tableName: "CourseCategory",
        timestamps: false
    }
);

CourseCategory.associate = function(models){
    CourseCategory.belongsTo(models.Course, {foreignKey: "courseId"});
    CourseCategory.belongsTo(models.Category, {foreignKey:"categoryId"});
};

module.exports = CourseCategory;