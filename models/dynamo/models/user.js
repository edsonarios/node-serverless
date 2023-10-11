const UserLib = require('../lib/user')
const CounterModel = require('./counter')

class UserModel {
    async create (data) {
        const counterModel = new CounterModel()
        const newUserId = await counterModel.getNextId('Users')
        const userData = {
            ...data,
            id: newUserId
        }
        const user = new UserLib(userData)
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

    async findByEmail (email) {
        try {
            const user = await UserLib.query('email').eq(email).using('EmailIndex').exec()
            if (user && user.length > 0) {
                return user[0]
            }
            return null
        } catch (error) {
            console.error('Error fetching user by email:', error)
            throw error
        }
    }
}

module.exports = UserModel
