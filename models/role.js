const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const Role = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      field:'role_name'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "role", 
    timestamps: false, 
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

module.exports = Role;