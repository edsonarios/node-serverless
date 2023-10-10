const axios = require('axios')

class CommentModel {
    async findAll () {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
            return response.data
        } catch (error) {
            console.error('Error fetching comments from JSONPlaceholder:', error)
            throw new Error('Failed to retrieve comments')
        }
    }
}

module.exports = CommentModel
