const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    CategoryName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ParentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Created_By: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    Updated_By: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    IconUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  { timestamps: false, tableName: "Category" }
);

module.exports = Category;
