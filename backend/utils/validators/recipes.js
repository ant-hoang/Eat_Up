const { check } = require('express-validator')
const { handleValidationErrors } = require('../validation')

const validateRecipe = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Title is required'),
  check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Description is required'),
  check('origin')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Origin is required'),
  check('directions')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Directions are required'),
  handleValidationErrors
]
  
  const validateIngredient = [
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .matches(/\D/g)
      .withMessage('Name is required'),
    check('quantity')
      .exists({ checkFalsy: true })
      .isDecimal()
      .custom((value) => {
        if (value <= 0) throw new Error('Quantity is not valid')
        return true
      })
      .withMessage('Quantity is not valid'),
    check('metric')
      .exists({ checkFalsy: false })
      .withMessage('Metric is required'),
  handleValidationErrors
]

module.exports = { validateRecipe, validateIngredient }