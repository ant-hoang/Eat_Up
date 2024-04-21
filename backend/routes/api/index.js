// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const recipesRouter = require('./recipes.js')
const commentsRouter = require('./comments.js')
const bookmarksRouter = require('./bookmarks.js')

const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/recipes', recipesRouter)
router.use('/comments', commentsRouter)
router.use('/bookmarks', bookmarksRouter)

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;