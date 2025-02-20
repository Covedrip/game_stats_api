'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matchHistory', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },
      userId: {
        type: Sequelize.UUID
      },
      gameId: {
        type: Sequelize.UUID
      },
      score: {
        type: Sequelize.INTEGER
      },
      outcome: {
        type: Sequelize.ENUM('win', 'lose', 'draw')
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matchHistory');
  }
};