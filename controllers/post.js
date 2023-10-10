const PostModel = require('../models/post')

exports.getPosts = async (req, res) => {
    try {
        const postModel = new PostModel()
        const posts = await postModel.findAll()
        res.status(200).json(posts)
    } catch (error) {
        console.error('Error in getPosts:', error)
        res.status(500).json({ error: error.message })
    }
}
