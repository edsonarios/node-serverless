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

exports.getPostById = async (req, res) => {
    try {
        const postModel = new PostModel()
        const post = await postModel.findById(req.params.postId)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ error: 'Post not found' })
        }
    } catch (error) {
        console.error('Error fetching post:', error)
        res.status(500).json({ error: 'Could not retrieve post' })
    }
}
