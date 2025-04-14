const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const UserRole = sequelize.define(
    'UserRole',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            field: 'user_id',
        },
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            field: 'role_id',
        },
    },
    {
        tableName: 'user_role',
        timestamps: false,
    }
);

UserRole.associate = function (models) {
    UserRole.belongsTo(models.User, { foreignKey: 'user_id' });
    UserRole.belongsTo(models.Role, { foreignKey: 'role_id' });
};

module.exports = UserRole;
