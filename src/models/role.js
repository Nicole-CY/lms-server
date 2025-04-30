const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const Role = sequelize.define(
    'Role',
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
            field: 'role_name',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'role',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Role.associate = function (models) {
    // role ↔ user
    Role.belongsToMany(models.User, {
        through: 'user_role',
        foreignKey: 'role_id',
        otherKey: 'user_id',
    });
    // role ↔ menu
    Role.belongsToMany(models.Menu, {
        through: models.RoleMenu,
        foreignKey: 'roleId',
        otherKey: 'menuId',
        as: 'menus',
    });
};

module.exports = Role;
