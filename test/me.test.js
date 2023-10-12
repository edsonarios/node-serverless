const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const supertest = require('supertest')
const app = require('../app')
const { UserModel } = require('../models/dynamo/index.js')
const CommentModel = require('../models/comment.js')
const PostModel = require('../models/post.js')
const { mockLogin } = require('./testHelper')

let token = ''

before(async () => {
    token = await mockLogin('personal')
})

describe('GET /me', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return details of the logged-in user', async () => {
        const mockMe = {
            password: '$2b$10$.hUc',
            id: '123',
            email: 'john@example.com',
            name: 'John Doe',
            roleId: '1'
        }

        sinon.stub(UserModel.prototype, 'findById').returns(mockMe)

        const response = await supertest(app)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockMe)
    })
})

describe('GET /me/posts', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return posts of the logged-in user', async () => {
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

        sinon.stub(PostModel.prototype, 'findByUser').returns(mockPosts)

        const response = await supertest(app)
            .get('/me/posts')
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockPosts)
    })
})

describe('GET /me/posts/:postId', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return a specific post of the logged-in user', async () => {
        const mockPostId = '101'
        const mockPost = {
            userId: 1,
            id: mockPostId,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
        }

        sinon.stub(PostModel.prototype, 'findByIdByUser').returns(mockPost)

        const response = await supertest(app)
            .get(`/me/posts/${mockPostId}`)
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockPost)
    })
})

describe('GET /me/posts/:postId/comments', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return comments for a specific post of the logged-in user', async () => {
        const mockPostId = '101'
        const mockPost = {
            userId: 1,
            id: mockPostId,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
        }
        const mockComments = [
            {
                postId: 1,
                id: 1,
                name: 'id labore ex et quam laborum',
                email: 'Eliseo@gardner.biz',
                body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
            },
            {
                postId: 1,
                id: 2,
                name: 'quo vero reiciendis velit similique earum',
                email: 'Jayne_Kuhic@sydney.com',
                body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et'
            }
        ]

        sinon.stub(PostModel.prototype, 'findByIdByUser').returns(mockPost)
        sinon.stub(CommentModel.prototype, 'findByPost').returns(mockComments)

        const response = await supertest(app)
            .get(`/me/posts/${mockPostId}/comments`)
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockComments)
    })
})
