const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const menu = sequelize.define(
  "menu",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    menu_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "menu",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    route_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: "menu" }
);

menu.associate = function (models) {
  menu.belongsTo(models.menu, { foreignKey: "parent_id", as: "parentMenu" });
  menu.hasMany(models.menu, { foreignKey: "parent_id", as: "submenus" });
};

module.exports = menu;
