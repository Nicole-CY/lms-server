const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const Menu = sequelize.define(
  "Menu",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    menuName: {
      type: DataTypes.STRING,
      field: "menu_name",
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      field: "parent_id",
      allowNull: true,
      references: {
        model: "menu",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    routePath: {
      type: DataTypes.STRING,
      field: "route_path",
      allowNull: false,
    },
  },
  { timestamps: false, tableName: "menu" }
);

Menu.associate = function (models) {
  Menu.belongsTo(models.Menu, { foreignKey: "parentId", as: "parentMenu" });
  Menu.hasMany(models.Menu, { foreignKey: "parentId", as: "submenus" });
};

module.exports = Menu;
