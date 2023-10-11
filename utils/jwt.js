const jwt = require('jsonwebtoken')

const SECRET_KEY = 'SECRET_KEY'
// const SECRET_KEY = process.env.SECRET_KEY

function generateToken (user) {
    const payload = {
        id: user.id,
        email: user.email,
        roleId: user.roleId
    }

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
}

function verifyToken (token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { generateToken, verifyToken }
