'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Bookmark } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Bookmark.bulkCreate([
      {
        userId: 1,
        recipeId: 4,
      },
      {
        userId: 2,
        recipeId: 1,
      },
      {
        userId: 3,
        recipeId: 2,
      },
      {
        userId: 2,
        recipeId: 4,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookmarks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
