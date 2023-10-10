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
