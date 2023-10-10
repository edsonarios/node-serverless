const dynamoose = require('dynamoose')

const CounterSchema = new dynamoose.Schema({
    PK: {
        type: String,
        hashKey: true
    },
    CurrentValue: Number
})

const CounterLib = dynamoose.model(process.env.COUNTERS_TABLE, CounterSchema)

module.exports = CounterLib
