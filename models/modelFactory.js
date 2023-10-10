const DB_TYPE = process.env.DATABASE_TYPE || 'dynamo'

function getModelGroup () {
    switch (DB_TYPE) {
    case 'dynamo':
        return require('./dynamo')
    case 'mongo':
        return require('./mongo')
    default:
        throw new Error('Unsupported DB_TYPE.')
    }
}

module.exports = getModelGroup()
