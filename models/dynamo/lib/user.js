const dynamoose = require('dynamoose')

const UserSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            global: true,
            name: 'EmailIndex'
        }
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: String,
        required: true
    }
})

const UserLib = dynamoose.model(process.env.USERS_TABLE, UserSchema)

module.exports = UserLib
