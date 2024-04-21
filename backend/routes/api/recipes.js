const express = require('express')

const { requireAuth } = require('../../utils/auth')
const { User, Recipe, Ingredient, Comment, Bookmark, Like, sequelize } = require('../../db/models')

const { validateRecipe, validateIngredient } = require('../../utils/validators/recipes')
const { validateComment } = require('../../utils/validators/comments')
const { check } = require('express-validator')

const router = express.Router()

/* 
----------------------------------------RECIPE/USERS----------------------------------------
*/

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

/* 
----------------------------------------RECIPE/LIKES----------------------------------------
*/

router.delete('/:recipeId/likes', requireAuth, async (req, res, next) => {
  const { recipeId } = req.params
  const nullBody = req.body
  const currUserId = req.user.id

  try {
    const checkRecipe = await Recipe.findOne( { where: { id: +recipeId }})
    if (!checkRecipe) throw new Error('Recipe couldn\'t be found')
    const checkLike = await Like.findOne({ where: { userId: currUserId, recipeId: +recipeId }})
    if (!checkLike) {
      const err = new Error('User has not liked this recipe')
      err.status = 500
      return next(err)
    } else if (checkLike.userId !== currUserId) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }

    await checkLike.destroy()

    res.json({ message: "Successfully deleted" })

  } catch (err) {
    err.status = 404
    return next(err)
  }
})


router.post('/:recipeId/likes', requireAuth, async (req, res, next) => {
  const { recipeId } = req.params
  const nullBody = req.body
  const currUserId = req.user.id

  try {
    const checkRecipe = await Recipe.findOne( { where: { id: +recipeId }})
    if (!checkRecipe) throw new Error('Recipe couldn\'t be found')

    const checkLike = await Like.findOne({ where: { userId: currUserId, recipeId: +recipeId }})
    if (checkLike) {
      const err = new Error('User has already liked this recipe')
      err.status = 500
      return next(err)
    }
    
    const like = await Like.create({ userId: currUserId, recipeId: +recipeId })

    res.json({ message: "Successfully liked" })

  } catch (err) {
    err.status = 404
    return next(err)
  }
})

/* 
----------------------------------------RECIPE/BOOKMARKS----------------------------------------
*/

router.delete('/:recipeId/bookmarks', requireAuth, async (req, res, next) => {
  const { recipeId } = req.params
  const nullBody = req.body
  const currUserId = req.user.id

  try {
    const checkRecipe = await Recipe.findOne({ where: { id: +recipeId } })
    if (!checkRecipe) throw new Error('Recipe couldn\'t be found')
    const checkBookmark = await Bookmark.findOne({ where: { userId: currUserId, recipeId: +recipeId } })
    if (!checkBookmark) {
      const err = new Error('User has not bookmarked this recipe')
      err.status = 500
      return next(err)
    } else if (checkBookmark.userId !== currUserId) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }

    await checkBookmark.destroy()

    res.json({ message: "Successfully deleted" })

  } catch (err) {
    err.status = 404
    return next(err)
  }
})


router.post('/:recipeId/bookmarks', requireAuth, async (req, res, next) => {
  const { recipeId } = req.params
  const nullBody = req.body
  const currUserId = req.user.id

  try {
    const checkRecipe = await Recipe.findOne({ where: { id: +recipeId } })
    if (!checkRecipe) throw new Error('Recipe couldn\'t be found')

    const checkBookmark = await Bookmark.findOne({ where: { userId: currUserId, recipeId: +recipeId } })
    if (checkBookmark) {
      const err = new Error('User has already bookmarked this recipe')
      err.status = 500
      return next(err)
    }

    const bookmark = await Bookmark.create({ userId: currUserId, recipeId: +recipeId })

    res.json({ message: "Successfully bookmarked" })

  } catch (err) {
    err.status = 404
    return next(err)
  }
})


/* 
----------------------------------------RECIPE/COMMENTS------------------------------------------
*/

// edit an existing comment for a specified recipe
router.put('/:recipeId/comments/:commentId', requireAuth, validateComment, async (req, res, next) => {
  const { recipeId, commentId } = req.params
  const { comment } = req.body
  const currUserId = req.user.id

  try {
    const checkComment = await Comment.findOne({ where: { recipeId: +recipeId, userId: currUserId }})
    if(!checkComment) throw new Error('Comment couldn\'t be found')
    if (checkComment.userId !== +currUserId) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }

    const recipe = await Recipe.findOne({ where: { id: +recipeId }})
    if (!recipe) throw new Error('Recipe couldn\'t be found')

    const uComment = await checkComment.update({ comment: comment })

    res.json(uComment)
    
  } catch (err) {
    err.status = 404
    return next(err)
  }
})

// delete an existing comment from a specified recipe
router.delete('/:recipeId/comments', requireAuth, async (req, res, next) => {
  const { recipeId } = req.params
  const currUserId = req.user.id

  try {
    const comment = await Comment.findOne({ where: { recipeId: +recipeId, userId: currUserId }})
    if (!comment) throw new Error('Comment couldn\'t be found')
    const recipe = await Recipe.findByPk(+recipeId)
    if (comment.userId !== +currUserId || comment.recipeId !== recipe.id) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }

    await comment.destroy()

    res.json({ message: 'Successfully deleted' })

  } catch(err) {
    err.status = 404
    return next(err)
  }
})

// create a comment for a specified recipe
router.post('/:recipeId/comments', requireAuth, validateComment, async (req, res, next) => {
  const { recipeId } = req.params
  const { comment } = req.body
  const currUserId = req.user.id

  try {
    const checkComment = await Comment.findOne({ where: { recipeId: +recipeId, userId: currUserId }})

    if (checkComment) {
      const err = new Error('User has already commented on this recipe')
      err.status = 500
      return next(err)
    }

    const recipe = await Recipe.findOne({ where: { id: +recipeId }})
    if (!recipe) throw new Error('Recipe couldn\'t be found')
    if (recipe.userId === +currUserId) {
      const err = new Error('Forbidden')
      err.status = 403
      return next(err)
    }

    const nComment = await Comment.create({ 
      userId: currUserId,
      recipeId: +recipeId,
      comment: comment
    })

    res.json(nComment)

  } catch (err) {
    err.status = 404
    return next(err)
  }

})

// get comments specified by a recipe id
router.get('/:recipeId/comments', async (req, res, next) => {
  const { recipeId } = req.params

  try {
    const recipe = await Recipe.findByPk(+recipeId)
    if (!recipe) throw new Error('Recipe couldn\'t be found')

    const comments = await Comment.findAll({
      where: { recipeId: +recipeId },
      include: { model: User, attributes: ['id', 'firstName', 'lastName'] }
    })

    res.json({ "Comments": comments })

  } catch (err) {
    err.status = 404
    return next(err)
  }
})

/* 
----------------------------------------RECIPE/INGREDIENTS----------------------------------------
*/

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
    const ingredient = await Ingredient.create({ name, quantity, metric, recipeId: +recipeId })

    res.status(201)
    res.json(ingredient)

  } catch (err) {
    err.status = 404
    return next(err)
  }
})

/* 
----------------------------------------RECIPES----------------------------------------
*/


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