const { DataTypes, Sequelize } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const Category = sequelize.define(
    'Category',
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
            field: 'category_name',
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'parent_id',
        },
        createdBy: {
            type: DataTypes.INTEGER,
            field: 'created_by',
            references: {
                model: 'user',
                key: 'id',
            },
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            field: 'updated_by',
            references: {
                model: 'user',
                key: 'id',
            },
        },
        iconUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'icon_url',
        },
    },
    {
        timestamps: true,
        tableName: 'category',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Category;
