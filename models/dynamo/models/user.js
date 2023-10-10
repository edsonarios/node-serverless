const UserLib = require('../lib/user')

class UserModel {
    async create (data) {
        const user = new UserLib(data)
        await user.save()
        return user
    }

    async findAll () {
        const users = await UserLib.scan().exec()
        return users
    }

    async findById (id) {
        const user = await UserLib.get(id)
        return user
    }
}

module.exports = UserModel
