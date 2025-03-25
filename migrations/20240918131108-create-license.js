"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("License", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(30),
        defaultValue: "",
      },
      client: {
        type: DataTypes.STRING(50),
      },
      employee_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      employee_email: {
        type: DataTypes.STRING(70),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(["active", "inactive"]),
      },
      email: {
        type: DataTypes.STRING(70),
      },
      platform: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("License");
  },
};
