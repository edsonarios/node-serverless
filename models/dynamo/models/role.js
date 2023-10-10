const RoleLib = require('../lib/role')

class RoleModel {
    async create (data) {
        const role = new RoleLib(data)
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
