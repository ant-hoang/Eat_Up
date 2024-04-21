'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Comment } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Comment.bulkCreate([
      {
        comment: 'How come the directions aren\'t provided?',
        userId: 1,
        recipeId: 3,
      },
      {
        comment: 'This was an easy and delicious recipe to make!',
        userId: 1,
        recipeId: 4,
      },
      {
        comment: 'A great pick-me-up option for the morning',
        userId: 2,
        recipeId: 1,
      },
      {
        comment: 'My first time trying a Japanese dish, I\'m so glad I gave it a shot!',
        userId: 3,
        recipeId: 2,
      },
      {
        comment: 'Did not like Italian food after all, not a fan of tomatoes',
        userId: 2,
        recipeId: 4,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
