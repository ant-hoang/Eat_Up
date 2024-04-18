const express = require('express')

const { requireAuth } = require('../../utils/auth')
const { User, Recipe, Ingredient, Like, sequelize } = require('../../db/models')

// Used as reference when importing validations for recipes
// const { validateSignup } = require('../../utils/validators/users')

const router = express.Router()

router.get('/current', requireAuth, async (req, res) => {
  const user_id = req.user.id
  const recipes = await Recipe.findAll({ 
    where: { userId: user_id },
    include: { model: Like }
  })

  let recipesJSON = []
  for (const recipe of recipes) {
    let setRecipe = recipe.toJSON()
    setRecipe.numLikes = setRecipe.Likes.length
    delete setRecipe.Likes
    recipesJSON.push(setRecipe)
  }

  res.json({ "Recipes": recipesJSON })
})

router.get('/:recipeId', async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findOne({
      where: { id: +recipeId },
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Ingredient, attributes: ['id', 'name', 'quantity', 'metric'] },
      ]
    });

    const count = await Like.count({ where: { recipeId: recipe.id } })
    const recipeJSON = recipe.toJSON()
    recipeJSON.numLikes = count

    res.json({ recipeJSON });
  } catch (err) {
    err.message = 'Recipe couldn\'t be found';
    err.status = 404;
    return next(err);
  }
})

router.get('/', async (req, res) => {
  const recipes = await Recipe.findAll({ include: {model: Like} })

  let recipesJSON = []
  for (const recipe of recipes) {
    let setRecipe = recipe.toJSON()
    setRecipe.numLikes = setRecipe.Likes.length
    delete setRecipe.Likes
    recipesJSON.push(setRecipe)
  }

  res.json({ "Recipes": recipesJSON })
})

module.exports = router