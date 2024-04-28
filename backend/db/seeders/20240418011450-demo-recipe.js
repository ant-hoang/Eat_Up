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
        video: 'https://eat-up-videos.s3.us-west-1.amazonaws.com/Pedro_Pascal_meme.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCL5PmOboh4qjFCk9SRfb2d9Pc5JCSKGrfYLU6kxigwhgIgcZ5vZpVnPyjJ7%2FS5%2Ff%2BmZbxDoJe3I31zK2CG2PYr07wq7QII5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5NzUwNDk5MDk0MTQiDPwCI%2FbaXU5w%2FtJlTirBAhRSwSWu%2Br1sQzN4QYg%2BiaPx%2BAII%2F%2FORCyB0%2BT4LEepVyRAkeEZD%2BX7ZsSBjxSgVKPLwIu5e6De0t4alRfMzDxH2C5SqfipSfYekYLHU0LgtOxibDO2lpqmp0pgFr%2B8qQZr6hkIuB%2BX4sGOGjEUrD%2B9kDevd2jRlMNzjgrckA4RFRuZE8Czw7QVjBFftO4Z6gHM1nrai%2FzKCyCUI68YTTdQ8yCf31%2FcMEiBqS6iO3kUNM4SYwhQLzZx4uCvKZbWeJPs3CXpBJ40CybZJ2mL3K01i7dAVshICpA1RcMT9LC2ED4h7kTqoEDRXBh346GlUV1HhXRc%2B2fdLezqbhHb%2B3ZvmTvifg4gleLwTIijNaO%2FH5JTpGC%2BfOPqAtCthVswsR09Pi9NVGAfC2BrTSSEkfkEDtHNxl66xkTnk4YDtya16GzCtq7exBjqzAtSkmtmYGg%2FJiKJSEMon0HXqyahiClYM86ud4mHayvtuYK8n3slvyL3RUDIU8TScV9ACBu2eB1fk2JuuStG87zU4rriMJz53S5G9UhsntRO74py9h54JP0gpIMSZMDWhvj0DY9PpJk3iV8x5jA5wRdrcA8ahRPzzvCe%2BsyBY8yZEYITXBJ9ZnYaEL3sC7tquGvhIo4MSPhzMWLWf%2BiQufaO1RnJj5WtqZEaCN7uemeKwRsk3BrFxz%2BSDSwPzF%2B37UFSL07ABOrBTscvWINLUoEWeSTXa%2FlPwM76cdPlDSXNC%2BU8I7yQan%2FZE59IwLpThu%2FVRS8AulyQHrgkSyiJbcYL%2BXJ4QXcyg%2B9sM2RwCzB%2FazH6CAN5ikKuzShtjGkbq3IOFkOHr3JGKIIY3JR0%2BsCRisYM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240428T080252Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA6GBMA4STCTB3F2CK%2F20240428%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=70b4f54e725e220ed15cfb9e131f5a6f1e663907e29e5ca46ec42de0ebf1188d',
        images: 'https://static.toiimg.com/thumb/75681091.cms?width=573&height=430',
      },
      {
        userId: 1,
        title: 'Japanese Curry',
        origin: 'Japanese',
        description: 'A delicious japanese home-cooked meal',
        directions: 'Finely chop the onions, mince the garlic, add oil into hot frying pan, add onions and garlic to the pan, add the seasoned pork into pan, add curry mix and slow cook til complete',
        video: 'https://eat-up-videos.s3.us-west-1.amazonaws.com/Pedro_Pascal_meme.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCL5PmOboh4qjFCk9SRfb2d9Pc5JCSKGrfYLU6kxigwhgIgcZ5vZpVnPyjJ7%2FS5%2Ff%2BmZbxDoJe3I31zK2CG2PYr07wq7QII5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5NzUwNDk5MDk0MTQiDPwCI%2FbaXU5w%2FtJlTirBAhRSwSWu%2Br1sQzN4QYg%2BiaPx%2BAII%2F%2FORCyB0%2BT4LEepVyRAkeEZD%2BX7ZsSBjxSgVKPLwIu5e6De0t4alRfMzDxH2C5SqfipSfYekYLHU0LgtOxibDO2lpqmp0pgFr%2B8qQZr6hkIuB%2BX4sGOGjEUrD%2B9kDevd2jRlMNzjgrckA4RFRuZE8Czw7QVjBFftO4Z6gHM1nrai%2FzKCyCUI68YTTdQ8yCf31%2FcMEiBqS6iO3kUNM4SYwhQLzZx4uCvKZbWeJPs3CXpBJ40CybZJ2mL3K01i7dAVshICpA1RcMT9LC2ED4h7kTqoEDRXBh346GlUV1HhXRc%2B2fdLezqbhHb%2B3ZvmTvifg4gleLwTIijNaO%2FH5JTpGC%2BfOPqAtCthVswsR09Pi9NVGAfC2BrTSSEkfkEDtHNxl66xkTnk4YDtya16GzCtq7exBjqzAtSkmtmYGg%2FJiKJSEMon0HXqyahiClYM86ud4mHayvtuYK8n3slvyL3RUDIU8TScV9ACBu2eB1fk2JuuStG87zU4rriMJz53S5G9UhsntRO74py9h54JP0gpIMSZMDWhvj0DY9PpJk3iV8x5jA5wRdrcA8ahRPzzvCe%2BsyBY8yZEYITXBJ9ZnYaEL3sC7tquGvhIo4MSPhzMWLWf%2BiQufaO1RnJj5WtqZEaCN7uemeKwRsk3BrFxz%2BSDSwPzF%2B37UFSL07ABOrBTscvWINLUoEWeSTXa%2FlPwM76cdPlDSXNC%2BU8I7yQan%2FZE59IwLpThu%2FVRS8AulyQHrgkSyiJbcYL%2BXJ4QXcyg%2B9sM2RwCzB%2FazH6CAN5ikKuzShtjGkbq3IOFkOHr3JGKIIY3JR0%2BsCRisYM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240428T080252Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA6GBMA4STCTB3F2CK%2F20240428%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=70b4f54e725e220ed15cfb9e131f5a6f1e663907e29e5ca46ec42de0ebf1188d',
        images: 'https://www.unclejerryskitchen.com/wp-content/uploads/2016/08/Curry-Rice-720x720.jpg',
      },
      {
        userId: 2,
        title: 'Chicken stirfry',
        origin: 'Chinese',
        description: 'An original recipe inspired from the East',
        directions: 'Forgot how to make this',
        video: 'https://eat-up-videos.s3.us-west-1.amazonaws.com/Pedro_Pascal_meme.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCL5PmOboh4qjFCk9SRfb2d9Pc5JCSKGrfYLU6kxigwhgIgcZ5vZpVnPyjJ7%2FS5%2Ff%2BmZbxDoJe3I31zK2CG2PYr07wq7QII5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5NzUwNDk5MDk0MTQiDPwCI%2FbaXU5w%2FtJlTirBAhRSwSWu%2Br1sQzN4QYg%2BiaPx%2BAII%2F%2FORCyB0%2BT4LEepVyRAkeEZD%2BX7ZsSBjxSgVKPLwIu5e6De0t4alRfMzDxH2C5SqfipSfYekYLHU0LgtOxibDO2lpqmp0pgFr%2B8qQZr6hkIuB%2BX4sGOGjEUrD%2B9kDevd2jRlMNzjgrckA4RFRuZE8Czw7QVjBFftO4Z6gHM1nrai%2FzKCyCUI68YTTdQ8yCf31%2FcMEiBqS6iO3kUNM4SYwhQLzZx4uCvKZbWeJPs3CXpBJ40CybZJ2mL3K01i7dAVshICpA1RcMT9LC2ED4h7kTqoEDRXBh346GlUV1HhXRc%2B2fdLezqbhHb%2B3ZvmTvifg4gleLwTIijNaO%2FH5JTpGC%2BfOPqAtCthVswsR09Pi9NVGAfC2BrTSSEkfkEDtHNxl66xkTnk4YDtya16GzCtq7exBjqzAtSkmtmYGg%2FJiKJSEMon0HXqyahiClYM86ud4mHayvtuYK8n3slvyL3RUDIU8TScV9ACBu2eB1fk2JuuStG87zU4rriMJz53S5G9UhsntRO74py9h54JP0gpIMSZMDWhvj0DY9PpJk3iV8x5jA5wRdrcA8ahRPzzvCe%2BsyBY8yZEYITXBJ9ZnYaEL3sC7tquGvhIo4MSPhzMWLWf%2BiQufaO1RnJj5WtqZEaCN7uemeKwRsk3BrFxz%2BSDSwPzF%2B37UFSL07ABOrBTscvWINLUoEWeSTXa%2FlPwM76cdPlDSXNC%2BU8I7yQan%2FZE59IwLpThu%2FVRS8AulyQHrgkSyiJbcYL%2BXJ4QXcyg%2B9sM2RwCzB%2FazH6CAN5ikKuzShtjGkbq3IOFkOHr3JGKIIY3JR0%2BsCRisYM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240428T080252Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA6GBMA4STCTB3F2CK%2F20240428%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=70b4f54e725e220ed15cfb9e131f5a6f1e663907e29e5ca46ec42de0ebf1188d',
        images: 'https://www.allrecipes.com/thmb/xvlRRhK5ldXuGcXad8XDM5tTAfE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/223382_chicken-stir-fry_Rita-1x1-1-b6b835ccfc714bb6a8391a7c47a06a84.jpg',
      },
      {
        userId: 3,
        title: 'Spaghetti and Meatballs',
        origin: 'Italian',
        description: 'An easy recipe that anyone can make',
        directions: 'Boil noodles for 10 min, season ground meat with garlic salt, cook ground meat in saucepan til it\'s browned, then add pasta sauce and noodles when done.',
        video: 'https://eat-up-videos.s3.us-west-1.amazonaws.com/Pedro_Pascal_meme.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCL5PmOboh4qjFCk9SRfb2d9Pc5JCSKGrfYLU6kxigwhgIgcZ5vZpVnPyjJ7%2FS5%2Ff%2BmZbxDoJe3I31zK2CG2PYr07wq7QII5v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw5NzUwNDk5MDk0MTQiDPwCI%2FbaXU5w%2FtJlTirBAhRSwSWu%2Br1sQzN4QYg%2BiaPx%2BAII%2F%2FORCyB0%2BT4LEepVyRAkeEZD%2BX7ZsSBjxSgVKPLwIu5e6De0t4alRfMzDxH2C5SqfipSfYekYLHU0LgtOxibDO2lpqmp0pgFr%2B8qQZr6hkIuB%2BX4sGOGjEUrD%2B9kDevd2jRlMNzjgrckA4RFRuZE8Czw7QVjBFftO4Z6gHM1nrai%2FzKCyCUI68YTTdQ8yCf31%2FcMEiBqS6iO3kUNM4SYwhQLzZx4uCvKZbWeJPs3CXpBJ40CybZJ2mL3K01i7dAVshICpA1RcMT9LC2ED4h7kTqoEDRXBh346GlUV1HhXRc%2B2fdLezqbhHb%2B3ZvmTvifg4gleLwTIijNaO%2FH5JTpGC%2BfOPqAtCthVswsR09Pi9NVGAfC2BrTSSEkfkEDtHNxl66xkTnk4YDtya16GzCtq7exBjqzAtSkmtmYGg%2FJiKJSEMon0HXqyahiClYM86ud4mHayvtuYK8n3slvyL3RUDIU8TScV9ACBu2eB1fk2JuuStG87zU4rriMJz53S5G9UhsntRO74py9h54JP0gpIMSZMDWhvj0DY9PpJk3iV8x5jA5wRdrcA8ahRPzzvCe%2BsyBY8yZEYITXBJ9ZnYaEL3sC7tquGvhIo4MSPhzMWLWf%2BiQufaO1RnJj5WtqZEaCN7uemeKwRsk3BrFxz%2BSDSwPzF%2B37UFSL07ABOrBTscvWINLUoEWeSTXa%2FlPwM76cdPlDSXNC%2BU8I7yQan%2FZE59IwLpThu%2FVRS8AulyQHrgkSyiJbcYL%2BXJ4QXcyg%2B9sM2RwCzB%2FazH6CAN5ikKuzShtjGkbq3IOFkOHr3JGKIIY3JR0%2BsCRisYM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240428T080252Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA6GBMA4STCTB3F2CK%2F20240428%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=70b4f54e725e220ed15cfb9e131f5a6f1e663907e29e5ca46ec42de0ebf1188d',
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
