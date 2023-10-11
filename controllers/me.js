const { UserModel } = require('../models/modelFactory')

exports.getMe = async (req, res) => {
    try {
        console.log(req.user)
        const userModel = new UserModel()
        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user)
    } catch (error) {
        console.error('Error fetching user details:', error)
        res.status(500).json({ error: 'Failed to retrieve user details' })
    }
}
