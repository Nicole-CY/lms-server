const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const Media = sequelize.define(
    "Media",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        sessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Session",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        fileType: {
            type: DataTypes.ENUM("video", "pdf"),
            allowNull: false,
        },
        fileName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        filePath: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        thumbnailPath: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        uploaderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        uploadedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        approvalStatus: {
            type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
            allowNull: false,
            defaultValue: "Pending",
        },
    },
    {
        timestamps: false,
        tableName: "Media",
    }
);

Media.associate = function (models) {
    Media.belongsTo(models.Session, { foreignKey: "sessionId" });
};

module.exports = Media;
