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
        SessionTitle: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        SessionDescription: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        Order: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CreatedBy: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
        },
        UpdatedBy: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
        },
    },
    { timestamps: false, tableName: "Session" }
);

module.exports = Session;