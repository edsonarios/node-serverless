const axios = require('axios')

class PostModel {
    async findAll () {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            return response.data
        } catch (error) {
            console.error('Error fetching posts from JSONPlaceholder:', error)
            throw new Error('Failed to retrieve posts')
        }
    }
}

module.exports = PostModel
