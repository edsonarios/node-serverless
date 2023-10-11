const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const supertest = require('supertest')
const app = require('../app')
const { UserModel } = require('../models/dynamo/index.js')
const { mockLogin } = require('./testHelper')

let token = ''

before(async () => {
    token = await mockLogin()
})

describe('GET /users', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return all users', async () => {
        const mockUsers = [{
            id: '123',
            name: 'John Doe',
            email: 'john@example.com',
            roleId: '1'
        },
        {
            id: '124',
            name: 'Jane Smith',
            email: 'jane@example.com',
            roleId: '2'
        }]

        sinon.stub(UserModel.prototype, 'findAll').returns(mockUsers)

        const response = await supertest(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error en la solicitud:', err))
        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockUsers)
    })
})

describe('GET /users/:userId', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return user details for valid userId', async () => {
        const mockUserId = '123'
        const mockUser = {
            id: mockUserId,
            name: 'John Doe',
            email: 'john@example.com',
            roleId: '1'
        }

        sinon.stub(UserModel.prototype, 'findById').returns(mockUser)

        const response = await supertest(app)
            .get(`/users/${mockUserId}`)
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error en la solicitud:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockUser)
    })
})

describe('POST /users', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should create a new user and return its details', async () => {
        const mockUserInput = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            roleId: '1'
        }
        const mockUserOutput = {
            id: '123',
            name: 'John Doe',
            email: 'john@example.com',
            roleId: '1'
        }

        sinon.stub(UserModel.prototype, 'findByEmail').returns(undefined)
        sinon.stub(UserModel.prototype, 'create').returns(mockUserOutput)

        const response = await supertest(app)
            .post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send(mockUserInput)
            .catch(err => console.error('Error en la solicitud:', err))

        expect(response.status).to.equal(201)
        expect(response.body).to.deep.equal(mockUserOutput)
    })
})
