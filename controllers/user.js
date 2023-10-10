const { UserModel } = require('../models/modelFactory')

exports.createUser = async (req, res) => {
    try {
        const userModel = new UserModel()
        const user = await userModel.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ error: 'Failed to create user' })
    }
}

exports.getUser = async (req, res) => {
    try {
        const userModel = new UserModel()
        const user = await userModel.findById(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        console.error('Error fetching user:', error)
        res.status(500).json({ error: 'Could not retrieve user' })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const userModel = new UserModel()
        const users = await userModel.findAll()
        res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching all users:', error)
        res.status(500).json({ error: 'Failed to retrieve users' })
    }
}
