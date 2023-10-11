const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

router.get('/', postController.getPosts)
router.get('/:postId', postController.getPostById)

module.exports = router
