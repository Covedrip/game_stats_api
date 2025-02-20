'use strict';
const {Model,DataTypes} = require('sequelize');
 const sequelize = require('../../config/database')

 const user = require('./user');
const game = require('./game');

module.exports = sequelize.define('matchHistory', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue:UUIDV4
  },
  userId: {
    type: DataTypes.UUID,
    references:{model:user, key:id}
  },
  gameId: {
    type: DataTypes.UUID,
    references:{model:game, key:id}
  },
  score: {
    type: DataTypes.INTEGER
  },
  outcome: {
    type: DataTypes.ENUM('win', 'lose', 'draw')
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
},{
  paranoid:true,
  freezeTableName:true,
  modelName:'matchHistory'
}
);