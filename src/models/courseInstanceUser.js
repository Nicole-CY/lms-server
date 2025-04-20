const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const CourseInstanceUser = sequelize.define(
    'CourseInstanceUser',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        courseInstanceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'course_instance_id',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        canRead: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'can_read',
        },
        canUpdate: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'can_update',
        },
        canDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'can_delete',
        },
    },
    {
        tableName: 'course_instance_user',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

CourseInstanceUser.associate = function (models) {
    CourseInstanceUser.belongsTo(models.CourseInstance, { foreignKey: 'course_instance_id' });
    CourseInstanceUser.belongsTo(models.User, { foreignKey: 'user_id' });
};

module.exports = CourseInstanceUser;
