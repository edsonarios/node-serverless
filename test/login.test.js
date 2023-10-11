const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const { UserModel, RoleModel } = require('../models/dynamo/index.js')

describe('POST /login', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return a token when valid mock credentials are provided', async () => {
        const mockEmail = 'test@example.com'
        const mockPassword = 'testpassword'

        const mockUsers = [{
            id: '1',
            email: mockEmail,
            password: bcrypt.hashSync(mockPassword, 10),
            roleId: '1'
        }]
        const mockUser = {
            id: '1',
            email: mockEmail,
            password: bcrypt.hashSync(mockPassword, 10),
            roleId: '1'
        }
        const mockRole = {
            id: '1',
            name: 'admin'
        }

        sinon.stub(UserModel.prototype, 'findAll').returns(mockUsers)
        sinon.stub(UserModel.prototype, 'findByEmail').returns(mockUser)
        sinon.stub(RoleModel.prototype, 'findById').returns(mockRole)

        const response = await supertest(app)
            .post('/login')
            .send({ email: mockEmail, password: mockPassword })
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('token')
    })

    it('should create a new admin user and role if no users exist and return a token', async () => {
        const mockEmail = 'newadmin@example.com'
        const mockPassword = 'adminpassword'

        const mockEmptyUsersList = []
        const mockNewAdminUser = {
            id: '2',
            email: mockEmail,
            password: bcrypt.hashSync(mockPassword, 10),
            roleId: '1'
        }
        const mockAdminRole = {
            id: '1',
            name: 'admin'
        }

        sinon.stub(UserModel.prototype, 'findAll').returns(mockEmptyUsersList)
        sinon.stub(UserModel.prototype, 'create').returns(mockNewAdminUser)
        sinon.stub(RoleModel.prototype, 'create').returns(mockAdminRole)
        sinon.stub(RoleModel.prototype, 'findById').returns(mockAdminRole)

        const response = await supertest(app)
            .post('/login')
            .send({ email: mockEmail, password: mockPassword })
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('token')
    })
})
