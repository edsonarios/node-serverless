const CounterLib = require('../lib/counter')

class CounterModel {
    async getNextId (tableName) {
        const result = await CounterLib.update({ PK: tableName }, { $ADD: { CurrentValue: 1 } })

        return result.CurrentValue + ''
    }
}

module.exports = CounterModel
