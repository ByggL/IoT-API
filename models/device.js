const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const License = db.define("License", {
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
  client: {
    type: DataTypes.STRING(50),
  },
  employee_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  employee_email: {
    type: DataTypes.STRING(70),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(["active", "inactive"]),
  },
  email: {
    type: DataTypes.STRING(70),
  },
  platform: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
});

module.exports = License;
