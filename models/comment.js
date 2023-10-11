const axios = require('axios')
const URL_JSON_PLACE_HOLDER_COMMENTS = 'https://jsonplaceholder.typicode.com/comments'

class CommentModel {
    async findAll () {
        try {
            const response = await axios.get(URL_JSON_PLACE_HOLDER_COMMENTS)
            return response.data
        } catch (error) {
            console.error('Error fetching comments from JSONPlaceholder:', error)
            throw new Error('Failed to retrieve comments')
        }
    }

    async findById (id) {
        try {
            const response = await axios.get(URL_JSON_PLACE_HOLDER_COMMENTS)
            const data = response.data
            const dataById = data.find(data => data.id === parseInt(id))
            return dataById
        } catch (error) {
            console.error('Error fetching posts from JSONPlaceholder:', error)
            throw new Error('Failed to retrieve posts')
        }
    }

    async findByPost (postId) {
        try {
            const response = await axios.get(URL_JSON_PLACE_HOLDER_COMMENTS)
            const data = response.data
            const dataByPost = data.filter(data => data.postId === parseInt(postId))
            return dataByPost
        } catch (error) {
            console.error('Error fetching posts from JSONPlaceholder:', error)
            throw new Error('Failed to retrieve posts')
        }
    }
}

module.exports = CommentModel
