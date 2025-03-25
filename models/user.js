const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/sequelizedb");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    birthDate: {
      type: DataTypes.DATEONLY, 
      field: 'birth_date',
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
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,// change to true for now, due to data missing columns
      defaultValue: true,
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  { timestamps: false, tableName: 'user' }
);

module.exports = User;