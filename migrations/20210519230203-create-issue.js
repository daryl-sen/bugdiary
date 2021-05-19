'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Issues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reference: {
        type: Sequelize.STRING
      },
      diary_id: {
        type: Sequelize.INTEGER
      },
      details: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      reporter_name: {
        type: Sequelize.STRING
      },
      reporter_email: {
        type: Sequelize.STRING
      },
      report_date: {
        type: Sequelize.DATE
      },
      resolve_date: {
        type: Sequelize.DATE
      },
      version_id: {
        type: Sequelize.INTEGER
      },
      location_id: {
        type: Sequelize.INTEGER
      },
      type_id: {
        type: Sequelize.INTEGER
      },
      priority: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Issues');
  }
};