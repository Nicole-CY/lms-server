const  {DataTypes} = require("sequelize");
const {sequelize} = require("../db/sequelizedb");

const CourseInstance = sequelize.define(
    "CourseInstance",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        courseId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate:{
            type: DataTypes.DATE,
            allowNull: True
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
          },
        totalSessions: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
        launchStatus: {
            type: DataTypes.ENUM('Scheduled', 'In Progress', 'Completed', 'Cancelled'),
            allowNull: true
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: true
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
          },
          createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true
          }

    }, {
        tableName: "CourseInstance",
        timestamps: false
    }
);
CourseInstance.associate = function(models){
    CourseInstance.belongsTo(models.Course, {foreignKey: "courseId"});
    CourseInstance.hasMany(models.CourseInstanceUser, {foreignKey: "courseInstanceId"})
};
module.exports = CourseInstance;