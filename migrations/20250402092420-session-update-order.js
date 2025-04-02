'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("session", "order", {
      type: Sequelize.INTEGER,
      allowNull: false, 
      unique: false,   
    });

    await queryInterface.addConstraint("session", {
      fields: ["course_instance_id", "order"], 
      type: "unique",
      name: "unique_courseInstanceId_order", 
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint("session", "unique_courseInstanceId_order");

    await queryInterface.changeColumn("session", "order", {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true, 
    });
  }
};
