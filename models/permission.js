const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const Permission = sequelize.define(
    "permission",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: true, 
        tableName: 'permissions', 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Permission;