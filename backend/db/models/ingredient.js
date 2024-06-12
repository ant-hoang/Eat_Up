'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredient.belongsTo(models.Recipe, { foreignKey: 'recipeId' })
    }
  }
  Ingredient.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        not: /\d/g
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        underZero(value) {
          if (value < 0) throw new Error('Not a valid quantity')
        }
      }
    },
    metric: {
      type: DataTypes.STRING,
      validate: {
        isIn: [[null, '', 'tsp', 'Tbsp', 'cup', 'cups', 'pt', 'qt', 'oz', 'fl oz', 'gal', 'lb', 'lbs']]
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};