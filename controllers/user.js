const { UserModel } = require('../models/modelFactory')

exports.createUser = async (req, res) => {
    const userInstance = new UserModel()
    const user = await userInstance.create(req.body)
    res.json(user)
}

exports.getUser = async (req, res) => {
    try {
        const userInstance = new UserModel()
        const user = await userInstance.findById(req.params.userId)
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

exports.getAllUsers = async (req, res) => {
    const userModel = new UserModel()
    const users = await userModel.findAll()
    res.json(users)
}
