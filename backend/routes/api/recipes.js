const express = require('express')

const { requireAuth } = require('../../utils/auth')
const { Recipe, User, Like } = require('../../db/models')

// Used as reference when importing validations for recipes
// const { validateSignup } = require('../../utils/validators/users')

const router = express.Router()

router.get('/current', requireAuth, async (req, res) => {
  // Need to add num_likes to response
  const user_id = req.user.id
  const allRecipes = await Recipe.findAll({ where: { userId: user_id }})

  let recipes = []
  for (const recipe of allRecipes) {
    let numLikes = await Like.findAll({ where: { recipeId: recipe.id}})
    let setRecipe = recipe.toJSON()
    setRecipe.numLikes = numLikes.length
    recipes.push(setRecipe)
  }
  
  res.json({ "Recipes": recipes })
})

router.get('/', async (req, res) => {
  // Need to add num_likes to response
  const allRecipes = await Recipe.findAll()
  let recipes = []
  for (const recipe of allRecipes) {
    let numLikes = await Like.findAll({ where: { recipeId: recipe.id}})
    let setRecipe = recipe.toJSON()
    setRecipe.numLikes = numLikes.length
    recipes.push(setRecipe)
  }

  res.json({ "Recipes": recipes })
})



module.exports = router