const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User, Comment, Recipe } = require('../../db/models')
// const { validateSignup } = require('../../utils/validators/users')

const router = express.Router()

// get comments based on current logged user
router.get('/', requireAuth, async (req, res) => {
  const user_id = req.user.id
  const comments = await Comment.findAll({
    where: { userId: user_id },
    include: { model: Recipe }
  })

  res.json({ "Comments": comments })
})


module.exports = router