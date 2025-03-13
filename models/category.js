const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const categoryModel = sequelize.define(
  "categoryModel",
  {
    // Model attributes are defined here
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ParentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Created_At: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    Updated_At: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    // Created_By: {
    //   type: DataTypes.INTEGER,
    // },
    IconUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false, tableName: "Category" }
);

module.exports = categoryModel;
