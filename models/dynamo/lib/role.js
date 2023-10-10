const dynamoose = require('dynamoose')

const RoleSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true
    },
    name: String
})

const RoleLib = dynamoose.model(process.env.ROLES_TABLE, RoleSchema)

module.exports = RoleLib
