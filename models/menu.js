const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const Menu = sequelize.define(
  "menu",
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

menu.associate = function (models) {
  menu.belongsTo(models.menu, { foreignKey: "parentId", as: "parentMenu" });
  menu.hasMany(models.menu, { foreignKey: "parentId", as: "submenus" });
};

module.exports = Menu;
