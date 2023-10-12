// testHelper.js
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const app = require('../app')
const { UserModel, RoleModel } = require('../models/dynamo/index.js')
const sinon = require('sinon')

const mockLogin = async (role = 'admin') => {
    sinon.restore()
    const mockEmail = role === 'personal' ? 'personal@example.com' : 'admin@example.com'
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
        name: role
    }

    sinon.stub(UserModel.prototype, 'findAll').returns(mockUsers)
    sinon.stub(UserModel.prototype, 'findByEmail').returns(mockUser)
    sinon.stub(RoleModel.prototype, 'findById').returns(mockRole)

    const loginResponse = await supertest(app)
        .post('/login')
        .send({ email: mockEmail, password: mockPassword })
        .catch(err => console.error('Error in the request:', err))

    return loginResponse.body.token
}

module.exports = {
    mockLogin
}
