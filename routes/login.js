const express = require('express')
// const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/jwt')
const { UserModel } = require('../models/modelFactory')
const { RoleModel } = require('../models/dynamo')

const router = express.Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userModel = new UserModel()
    const roleModel = new RoleModel()
    const user = await userModel.findByEmail(email)
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' })
    }

    // const validPassword = bcrypt.compareSync(password, user.password)
    if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password.' })
    }
    const role = await roleModel.findById(user.roleId)
    user.roleId = role.name
    const token = generateToken(user)
    res.json({ token })
})

module.exports = router
