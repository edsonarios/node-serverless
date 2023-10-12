const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const supertest = require('supertest')
const app = require('../app')
const PostModel = require('../models/post.js')
const { mockLogin } = require('./testHelper')

let token = ''

before(async () => {
    token = await mockLogin()
})

describe('GET /posts', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return all posts', async () => {
        const mockPosts = [
            {
                userId: 1,
                id: 1,
                title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
            },
            {
                userId: 1,
                id: 2,
                title: 'qui est esse',
                body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
            }
        ]

        sinon.stub(PostModel.prototype, 'findAll').returns(mockPosts)

        const response = await supertest(app)
            .get('/posts')
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockPosts)
    })
})

describe('GET /posts/:postId', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return post details for valid postId', async () => {
        const mockPostId = '1'
        const mockPost = {
            userId: 1,
            id: mockPostId,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
        }

        sinon.stub(PostModel.prototype, 'findById').returns(mockPost)

        const response = await supertest(app)
            .get(`/posts/${mockPostId}`)
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockPost)
    })
})
