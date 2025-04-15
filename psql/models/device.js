const { Sequelize, DataTypes } = require("sequelize");
const { psdb } = require("../../config/database");

const Device = psdb.define("devices", {
  id: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: "",
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  measuretype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Device;
