const UserModel = require('../models/dynamo/user')

exports.getUser = async (req, res) => {
    try {
        const user = await UserModel.get(req.params.userId)
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Could not retrieve user' })
    }
}
