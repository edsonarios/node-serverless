const CommentModel = require('../models/comment')

exports.getComments = async (req, res) => {
    try {
        const commentModel = new CommentModel()
        const comments = await commentModel.findAll()
        res.status(200).json(comments)
    } catch (error) {
        console.error('Error in getComments:', error)
        res.status(500).json({ error: error.message })
    }
}

exports.getCommentById = async (req, res) => {
    try {
        const commentModel = new CommentModel()
        const comment = await commentModel.findById(req.params.commentId)
        if (comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({ error: 'Comment not found' })
        }
    } catch (error) {
        console.error('Error fetching comment:', error)
        res.status(500).json({ error: 'Could not retrieve comment' })
    }
}
