const { UserModel } = require('../models/modelFactory')
const PostModel = require('../models/post')
const CommentModel = require('../models/comment')

exports.getMe = async (req, res) => {
    try {
        const userModel = new UserModel()
        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user)
    } catch (error) {
        console.error('Error fetching user details:', error)
        res.status(500).json({ error: 'Failed to retrieve user details' })
    }
}

exports.getMePost = async (req, res) => {
    try {
        const postModel = new PostModel()
        const post = await postModel.findByUser(req.user.id)
        if (!post) {
            return res.status(404).json({ error: 'Posts by User not found' })
        }
        res.status(200).json(post)
    } catch (error) {
        console.error('Error fetching post details:', error)
        res.status(500).json({ error: 'Failed to retrieve post details' })
    }
}

exports.getMePostById = async (req, res) => {
    try {
        const postModel = new PostModel()
        const post = await postModel.findByIdByUser(req.user.id, req.params.postId)
        if (!post) {
            return res.status(404).json({ error: 'Post by User not found' })
        }
        res.status(200).json(post)
    } catch (error) {
        console.error('Error fetching post details:', error)
        res.status(500).json({ error: 'Failed to retrieve post details' })
    }
}

exports.getMeCommentByPostId = async (req, res) => {
    try {
        const postModel = new PostModel()
        const post = await postModel.findByIdByUser(req.user.id, req.params.postId)
        if (!post) {
            return res.status(404).json({ error: 'Post by User not found' })
        }
        const commentModel = new CommentModel()
        const comments = await commentModel.findByPost(req.params.postId)
        if (!comments) {
            return res.status(404).json({ error: 'Comments by Post by User not found' })
        }
        res.status(200).json(comments)
    } catch (error) {
        console.error('Error fetching comments details:', error)
        res.status(500).json({ error: 'Failed to retrieve comments' })
    }
}
