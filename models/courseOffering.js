const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const CourseOffering = sequelize.define(
    "CourseOffering",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        course_instance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "course_instance",
                key: "id",
            },
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        student_capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Pending Start", "Active", "Completed"),
            allowNull: false,
        },
    },
    {
        tableName: "course_offering",
        timestamps: false,
    }
);

module.exports = CourseOffering;
