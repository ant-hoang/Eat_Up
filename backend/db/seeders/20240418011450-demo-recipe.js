'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Recipe } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Recipe.bulkCreate([
      {
        userId: 1,
        title: 'American Breakfast Special',
        origin: 'American',
        description: 'The All American favorite morning cuisine',
        directions: 'Step 1. Prepare the eggs, Step 2. Cook bacon in frying pan, Step 3. Cook eggs in frying pan after bacon is done',
        video: '',
        images: 'https://static.toiimg.com/thumb/75681091.cms?width=573&height=430',
      },
      {
        userId: 1,
        title: 'Japanese Curry',
        origin: 'Japanese',
        description: 'A delicious japanese home-cooked meal',
        directions: 'Finely chop the onions, mince the garlic, add oil into hot frying pan, add onions and garlic to the pan, add the seasoned pork into pan, add curry mix and slow cook til complete',
        video: '',
        images: 'https://www.unclejerryskitchen.com/wp-content/uploads/2016/08/Curry-Rice-720x720.jpg',
      },
      {
        userId: 2,
        title: 'Chicken stirfry',
        origin: 'Chinese',
        description: 'An original recipe inspired from the East',
        directions: 'Forgot how to make this',
        video: '',
        images: 'https://www.allrecipes.com/thmb/xvlRRhK5ldXuGcXad8XDM5tTAfE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/223382_chicken-stir-fry_Rita-1x1-1-b6b835ccfc714bb6a8391a7c47a06a84.jpg',
      },
      {
        userId: 3,
        title: 'Spaghetti and Meatballs',
        origin: 'Italian',
        description: 'An easy recipe that anyone can make',
        directions: 'Boil noodles for 10 min, season ground meat with garlic salt, cook ground meat in saucepan til it\'s browned, then add pasta sauce and noodles when done.',
        video: '',
        images: 'https://www.slimmingeats.com/blog/wp-content/uploads/2013/02/spaghetti-meatballs-7-1-735x735.jpg',
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Recipes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
