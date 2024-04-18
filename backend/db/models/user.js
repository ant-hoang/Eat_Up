'use strict';
const { Model } = require('sequelize');
const { Validator } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Recipe, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
      User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          // if (Validator.isEmail(value)) {
          //   throw new Error("Cannot be an email.")
          // }
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.")
          }
        },
        mustContainLetter(value) {
          const alpha = 'abcdefghijklmnopqrstuvwxyz'
          let hasAlpha = false
          for (let i = 0; i < value.length; i++) {
            if (alpha.includes(value[i].toLowerCase())) {
              hasAlpha = true
            }
          }

          if (!hasAlpha) {
            throw new Error('Username must contain a letter')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
        notEmpty: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        notContains: ' '
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        notContains: ' '
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};