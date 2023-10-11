const express = require('express')
const router = express.Router()
const meController = require('../controllers/me')

router.get('/', meController.getMe)
router.get('/posts', meController.getMePost)
router.get('/posts/:postId', meController.getMePostById)
router.get('/posts/:postId/comments', meController.getMeCommentByPostId)

module.exports = router
