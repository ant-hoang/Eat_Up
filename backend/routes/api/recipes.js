const express = require('express')

const { requireAuth } = require('../../utils/auth')
const { User, Recipe, Ingredient, Like, sequelize } = require('../../db/models')

const { validateRecipe, validateIngredient } = require('../../utils/validators/recipes')

const router = express.Router()

// gets recipes based on current logged user
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

// delete an ingredient to a recipe specified by id
router.delete('/:recipeId/ingredients/:ingredientId', requireAuth, async (req, res, next) => {
  const { recipeId, ingredientId } = req.params
  const currUserId = req.user.id

  try {
    const ingredient = await Ingredient.findByPk(+ingredientId)
    if (!ingredient) throw new Error('Ingredient could\'t be found')
    const recipe = await Recipe.findByPk(+recipeId)
    if (recipe.userId !== +currUserId || ingredient.recipeId !== recipe.id) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }

    await ingredient.destroy()

    res.json({ message: 'Successfully deleted' })

  } catch (err) {
    err.status = 404
    return next(err)
  }
})

// add an ingredient to a recipe specified by id
router.post('/:recipeId/ingredients', requireAuth, validateIngredient, async (req, res, next) => {
  const { recipeId } = req.params
  const { name, quantity, metric } = req.body
  const currUserId = req.user.id

  try {
    const recipe = await Recipe.findByPk(+recipeId)
    if (!recipe) throw new Error('Recipe could\'t be found')
    if (recipe.userId !== +currUserId) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }
    console.log("INGREDIENT", {"name": name, "quantity": quantity, "metric": metric})
    const ingredient = await Ingredient.create({ name, quantity, metric, recipeId: +recipeId })

    res.status(201)
    res.json(ingredient)

  } catch (err) {
    err.status = 404
    return next(err)
  }
})

// gets a recipe specified by id
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

// edit a recipe
router.put('/:recipeId', requireAuth, validateRecipe, async (req, res, next) => {
  const { recipeId } = req.params
  const { title, description, origin, directions } = req.body
  const userId = req.user.id

  try {
    const recipe = await Recipe.findByPk(+recipeId)
    if (!recipe) throw new Error('Recipe couldn\'t be found')
    if (recipe.userId !== userId) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }
    
    const editRecipe = await recipe.update({ 
      title: title, 
      description: description, 
      origin: origin, 
      directions: directions,
    })
    
    res.json(editRecipe)
  } catch (err) {
    err.status = 404
    return next(err)
  }

})

// delete a recipe
router.delete('/:recipeId', requireAuth, async (req, res, next) => {
  const { recipeId } = req.params
  const currUserId = req.user.id

  try {
    const recipe = await Recipe.findByPk(+recipeId)
    if (!recipe) throw new Error('Recipe could\'t be found')
    if (recipe.userId !== +currUserId) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }

    await recipe.destroy()

    res.json({ message: 'Successfully deleted'})

  } catch (err) {
    err.status = 404
    return next(err)
  }
})

// creates a recipe
router.post('/', requireAuth, validateRecipe, async (req, res, next) => {
  const { title, description, origin, directions } = req.body
  const userId = req.user.id

  const recipe = await Recipe.create({ userId, title, description, origin, directions })

  res.status(201)
  res.json(recipe)
})

// gets all recipes
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