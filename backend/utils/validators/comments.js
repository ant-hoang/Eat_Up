const { check } = require('express-validator')
const { handleValidationErrors } = require('../validation')

const validateComment = [
  check('comment')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Comment is required'),
  handleValidationErrors
]

module.exports = { validateComment }