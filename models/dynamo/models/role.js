const RoleLib = require('../lib/role')
const CounterModel = require('./counter')

class RoleModel {
    async create (data) {
        const counterModel = new CounterModel()
        const newRoleId = await counterModel.getNextId('Roles')
        const roleData = {
            ...data,
            id: newRoleId
        }
        const role = new RoleLib(roleData)
        await role.save()
        return role
    }

    async findAll () {
        const roles = await RoleLib.scan().exec()
        return roles
    }

    async findById (id) {
        const role = await RoleLib.get(id)
        return role
    }
}

module.exports = RoleModel
