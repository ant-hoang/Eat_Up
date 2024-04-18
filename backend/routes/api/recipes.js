const express = require('express')

const { requireAuth } = require('../../utils/auth')
const { Recipe, User, Like } = require('../../db/models')

// Used as reference when importing validations for recipes
// const { validateSignup } = require('../../utils/validators/users')

const router = express.Router()

router.get('/current', requireAuth, async (req, res) => {
  const user_id = req.user.id
  const allRecipes = await Recipe.findAll({ where: { userId: user_id }})

  let recipes = []
  for (const recipe of allRecipes) {
    const { count } = await Like.findAndCountAll({ where: { recipeId: recipe.id}})
    let setRecipe = recipe.toJSON()
    setRecipe.numLikes = count
    recipes.push(setRecipe)
  }
  
  res.json({ "Recipes": recipes })
})

router.get('/', async (req, res) => {
  const allRecipes = await Recipe.findAll()
  let recipes = []
  for (const recipe of allRecipes) {
    const { count } = await Like.findAndCountAll({ where: { recipeId: recipe.id}})
    let setRecipe = recipe.toJSON()
    setRecipe.numLikes = count
    recipes.push(setRecipe)
  }

  res.json({ "Recipes": recipes })
})



module.exports = router