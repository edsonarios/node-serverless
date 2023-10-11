const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment')

router.get('/', commentController.getComments)
router.get('/:commentId', commentController.getCommentById)

module.exports = router
