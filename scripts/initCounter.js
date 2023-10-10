const CounterLib = require('../models/dynamo/lib/counter')

const initializeIfNeeded = async () => {
    const usersCounter = await CounterLib.get('Users')
    const rolesCounter = await CounterLib.get('Roles')

    if (!usersCounter) {
        const newUserCounter = new CounterLib({
            PK: 'Users',
            CurrentValue: 1
        })
        await newUserCounter.save()
    }

    if (!rolesCounter) {
        const newRoleCounter = new CounterLib({
            PK: 'Roles',
            CurrentValue: 1
        })
        await newRoleCounter.save()
    }
}

initializeIfNeeded().catch(err => console.error('Failed to initialize counters:', err))
