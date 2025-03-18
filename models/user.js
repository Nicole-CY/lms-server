const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const user = sequelize.define(
  "user",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      //allowNull:false,
    },
    gender: {
      type: DataTypes.INTEGER,
      //allowNull:false,
    },
    age: {
      type: DataTypes.INTEGER,
      // allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true, // Allow null because avatar might not be provided initially
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,// change to true for now, due to data missing columns
      defaultValue: true,
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: 'user' }
);

module.exports = user;