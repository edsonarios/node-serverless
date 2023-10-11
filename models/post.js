const axios = require('axios')
const URL_JSON_PLACE_HOLDER_POSTS = 'https://jsonplaceholder.typicode.com/posts'

class PostModel {
    async findAll () {
        try {
            const response = await axios.get(URL_JSON_PLACE_HOLDER_POSTS)
            return response.data
        } catch (error) {
            console.error('Error fetching posts from JSONPlaceholder:', error)
            throw new Error('Failed to retrieve posts')
        }
    }

    async findById (id) {
        try {
            const response = await axios.get(URL_JSON_PLACE_HOLDER_POSTS)
            const data = response.data
            const dataById = data.find(data => data.id === parseInt(id))
            return dataById
        } catch (error) {
            console.error('Error fetching posts from JSONPlaceholder:', error)
            throw new Error('Failed to retrieve posts')
        }
    }
}

module.exports = PostModel
