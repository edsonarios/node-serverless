const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const supertest = require('supertest')
const app = require('../app')
const { RoleModel } = require('../models/dynamo/index.js')
const { mockLogin } = require('./testHelper')

let token = ''

before(async () => {
    token = await mockLogin()
})

describe('GET /roles', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return all roles', async () => {
        const mockRoles = [
            { id: '1', name: 'admin' },
            { id: '2', name: 'personal' }
        ]

        sinon.stub(RoleModel.prototype, 'findAll').returns(mockRoles)

        const response = await supertest(app)
            .get('/roles')
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockRoles)
    })
})

describe('GET /roles/:roleId', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should return role details for valid roleId', async () => {
        const mockRoleId = '1'
        const mockRole = {
            id: mockRoleId,
            name: 'admin'
        }

        sinon.stub(RoleModel.prototype, 'findById').returns(mockRole)

        const response = await supertest(app)
            .get(`/roles/${mockRoleId}`)
            .set('Authorization', `Bearer ${token}`)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(200)
        expect(response.body).to.deep.equal(mockRole)
    })
})

describe('POST /roles', () => {
    beforeEach(() => {
        sinon.restore()
    })

    it('should create a new role and return its details', async () => {
        const mockRoleInput = {
            name: 'personal'
        }
        const mockRoleOutput = {
            id: '2',
            name: 'personal'
        }

        sinon.stub(RoleModel.prototype, 'create').returns(mockRoleOutput)

        const response = await supertest(app)
            .post('/roles')
            .set('Authorization', `Bearer ${token}`)
            .send(mockRoleInput)
            .catch(err => console.error('Error in the request:', err))

        expect(response.status).to.equal(201)
        expect(response.body).to.deep.equal(mockRoleOutput)
    })
})
