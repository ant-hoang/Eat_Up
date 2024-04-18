'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.User, { foreignKey: 'userId' })
      Recipe.hasMany(models.Ingredient, { foreignKey: 'recipeId', onDelete: 'CASCADE', hooks: true })
      Recipe.hasMany(models.Comment, { foreignKey: 'recipeId', onDelete: 'CASCADE', hooks: true })
      Recipe.hasMany(models.Bookmark, { foreignKey: 'recipeId', onDelete: 'CASCADE', hooks: true })
      Recipe.hasMany(models.Like, { foreignKey: 'recipeId', onDelete: 'CASCADE', hooks: true })
    }
  }
  Recipe.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    directions: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty: true
      // }
    },
    // Additional Info to consider adding
    // prepTime: {
    //   type: DataTypes.INTEGER
    // },
    // cookTime: {
    //   type: DataTypes.INTEGER
    // },
    // totalTime: {
    //   type: DataTypes.INTEGER
    // },
    // servings: {
    //   type: DataTypes.INTEGER
    // },
    video: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    images: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};