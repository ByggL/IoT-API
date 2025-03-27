"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Device", {
      id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(30),
        defaultValue: "",
      },
      type: {
        type: Sequelize.STRING(50),
      },
      measuretype: {
        type: Sequelize.STRING(30),
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Device");
  },
};
