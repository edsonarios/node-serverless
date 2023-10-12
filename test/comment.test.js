const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const supertest = require('supertest')
const app = require('../app')
const CommentModel = require('../models/comment.js')
const { mockLogin } = require('./testHelper')

let token = ''

before(async () => {
    token = await mockLogin()
})

describe('GET /comments', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return all comments', async () => {
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

        sinon.stub(CommentModel.prototype, 'findAll').returns(mockComments)

        const response = await supertest(app)
            .get('/comments')
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockComments)
    })
})

describe('GET /comments/:commentId', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return comment details for valid commentId', async () => {
        const mockCommentId = '101'
        const mockComment = {
            postId: 1,
            id: mockCommentId,
            name: 'id labore ex et quam laborum',
            email: 'Eliseo@gardner.biz',
            body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
        }

        sinon.stub(CommentModel.prototype, 'findById').returns(mockComment)

        const response = await supertest(app)
            .get(`/comments/${mockCommentId}`)
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockComment)
    })
})
