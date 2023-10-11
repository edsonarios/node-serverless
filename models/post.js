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

    async findById (id) {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            const data = response.data
            const responseById = data.find(data => data.id === parseInt(id))
            return responseById
        } catch (error) {
            console.error('Error fetching posts from JSONPlaceholder:', error)
            throw new Error('Failed to retrieve posts')
        }
    }
}

module.exports = PostModel
