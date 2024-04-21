'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Ingredient } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Ingredient.bulkCreate([
      {
        name: 'Eggs',
        quantity: 2,
        metric: '',
        recipeId: 1
      },
      {
        name: 'Bacon Slices',
        quantity: 3,
        metric: '',
        recipeId: 1
      },
      {
        name: 'Curry Mix',
        quantity: 2,
        metric: 'fl oz',
        recipeId: 2
      },
      {
        name: 'Pork Ribs',
        quantity: 1.5,
        metric: 'lbs',
        recipeId: 2
      },
      {
        name: 'Garlic',
        quantity: 0.5,
        metric: 'cup',
        recipeId: 2
      },
      {
        name: 'Onion',
        quantity: 2,
        metric: 'cups',
        recipeId: 2
      },
      {
        name: 'Cooking Oil',
        quantity: 2,
        metric: 'Tbsp',
        recipeId: 2
      },
      {
        name: 'Chicken',
        quantity: 2,
        metric: 'lbs',
        recipeId: 3
      },
      {
        name: 'Brocolli',
        quantity: 4,
        metric: 'oz',
        recipeId: 3
      },
      {
        name: 'Garlic',
        quantity: 0.5,
        metric: 'cup',
        recipeId: 3
      },
      {
        name: 'Red Onion',
        quantity: 0.5,
        metric: '',
        recipeId: 3
      },
      {
        name: 'Oyster Sauce',
        quantity: 3,
        metric: 'tsp',
        recipeId: 3
      },
      {
        name: 'Pasta Noodles',
        quantity: 2.5,
        metric: 'oz',
        recipeId: 4
      },
      {
        name: 'Tomato Marinara Sauce',
        quantity: 2,
        metric: 'cups',
        recipeId: 4
      },
      {
        name: 'Ground Beef',
        quantity: 1,
        metric: 'lb',
        recipeId: 4
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Recipes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    }, {})
  }
};
