const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const RoleMenu = sequelize.define(
    'RoleMenu',
    {
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'role_id',
        },
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'menu_id',
        },
    },
    {
        tableName: 'role_menu',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

RoleMenu.associate = function (models) {
    RoleMenu.belongsTo(models.Role, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
    });

    RoleMenu.belongsTo(models.Menu, {
        foreignKey: 'menuId',
        onDelete: 'CASCADE',
    });
};

module.exports = RoleMenu;
