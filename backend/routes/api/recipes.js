const express = require('express')

const { requireAuth } = require('../../utils/auth')
const { User, Recipe, Ingredient, Like, sequelize } = require('../../db/models')

// Used as reference when importing validations for recipes
// const { validateSignup } = require('../../utils/validators/users')

const router = express.Router()

router.get('/current', requireAuth, async (req, res) => {
  const user_id = req.user.id
  const recipes = await Recipe.findAll({ where: { userId: user_id }})

  let recipesJSON = []
  for (const recipe of recipes) {
    const { count } = await Like.findAndCountAll({ where: { recipeId: recipe.id}})
    let setRecipe = recipe.toJSON()
    setRecipe.numLikes = count
    recipesJSON.push(setRecipe)
  }
  
  res.json({ "Recipes": recipesJSON })
})

router.get('/:recipeId', async (req, res, next) => {
  // const { recipeId } = req.params
  
  // try {
  //   const recipe = await Recipe.findOne({ 
  //     where: { id: +recipeId},
  //     // attributes: {
  //     //   include: [[sequelize.fn('COUNT', sequelize.col('Likes.recipeId')), 'numLikes']]
  //     // },
  //     include: [
  //       { model: User, attributes: ['id', 'username'] },
  //       { model: Ingredient, attributes: ['id', 'name', 'quantity', 'metric'] },
  //       // { model: Like, attributes: [], where: { recipeId: +recipeId}},
  //     ]
  //   })
  //   console.log("RECIPE!!!!", recipe)
  //   // const { count } = await Like.findAndCountAll({ where: { recipeId: recipe.id}})
  //   // const ingredients = await Ingredient.findAll({ where: { recipeId: recipe.id}})
  //   // console.log("INGREDIENTS: ", ingredients)

  //   res.json({ recipe })

  // } catch (err) {
  //   err.message = 'Recipe couldn\'t be found'
  //   err.status = 404
  //   return next(err)
  // }



  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findOne({
      where: { id: +recipeId },
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.literal('DISTINCT Likes.userId')), 'numLikes']]
      },
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Ingredient, attributes: ['id', 'name', 'quantity', 'metric'] },
        {
          model: Like,
          where: { recipeId: +recipeId },
          attributes: []
        }
      ]
    });

    res.json({ recipe });
  } catch (err) {
    err.message = 'Recipe couldn\'t be found';
    err.status = 404;
    return next(err);
  }
})

router.get('/', async (req, res) => {
  const recipes = await Recipe.findAll()
  let recipesJSON = []
  for (const recipe of recipes) {
    const { count } = await Like.findAndCountAll({ where: { recipeId: recipe.id}})
    let setRecipe = recipe.toJSON()
    setRecipe.numLikes = count
    recipesJSON.push(setRecipe)
  }

  res.json({ "Recipes": recipesJSON })
})



module.exports = router