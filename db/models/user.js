'use strict';
const { configDotenv } = require('dotenv');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../../config/database');

module.exports = sequelize.define('user', 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: 'username cannot be null',
          },
          notEmpty: {
              msg: 'username cannot be empty',
          },
      },
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value===this.password){
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hash);
        } else {
          throw new Error('Password and confirm password must be the same');

        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  },
  {
    paranoid:true,
    freezeTableName: true,
    modelName: "user"
  }
);
