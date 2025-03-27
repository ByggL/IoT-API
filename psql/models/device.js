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
    type: DataTypes.STRING(30),
    defaultValue: "",
  },
  type: {
    type: DataTypes.STRING(50),
  },
  measuretype: {
    type: DataTypes.STRING(30),
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

module.exports = Device;
