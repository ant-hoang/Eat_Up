const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User, Bookmark } = require('../../db/models')

const router = express.Router()

// get all bookmarked recipes by current user
router.get('/current', requireAuth, async (req, res) => {
  const currUserId = req.user.id

  const bookmarks = await Bookmark.findAll({ where: { userId: currUserId }})

  res.json({ Bookmarks: bookmarks })
})

module.exports = router