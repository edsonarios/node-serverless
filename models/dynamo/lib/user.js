const dynamoose = require('dynamoose')

const UserSchema = new dynamoose.Schema({
    userId: {
        type: String,
        hashKey: true
    },
    name: String
})

const UserLib = dynamoose.model(process.env.USERS_TABLE, UserSchema)

module.exports = UserLib
