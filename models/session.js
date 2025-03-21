const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const Session = sequelize.define(
    "session",
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
                model: "courseInstance",
                key: "id",
            }
        },
        sessionTitle: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'session_title',
        },
        sessionDescription: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'session_description',
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
        createdBy: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'created_by',
            references: {
                model: "users",
                key: "id",
            },
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at',
        },
        updatedBy: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'updated_by',
            references: {
                model: "users",
                key: "id",
            },
        },
    },
    { timestamps: false, tableName: "sessions" }
);

Session.associate = function (models) {
    Session.belongsTo(models.courseInstance, { foreignKey: "courseInstanceId" });
};

module.exports = Session;