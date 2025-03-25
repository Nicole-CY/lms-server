const { DataTypes, Sequelize } = require("sequelize");
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
    categoryName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field:"category_name", //Maps JavaScript name to DB column
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "parent_id",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field:"created_by",
      references: {
        model: "Users",
        key: "id",
      },
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      field:"updated_by",
      references: {
        model: "Users",
        key: "id",
      },
    },
    iconUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field:"icon_url",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      filed:"created_at",
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      filed:"updated_at",
    },
  },
  { timestamps: false, tableName: "category" }
);

module.exports = Category;
