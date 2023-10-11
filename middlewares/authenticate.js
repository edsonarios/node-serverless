const { verifyToken } = require('../utils/jwt')

function authenticate (req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).send('Access denied. No token provided.')

    try {
        const user = verifyToken(token)
        req.user = user
        next()
    } catch (error) {
        res.status(400).send('Invalid token.')
    }
}

function requireRoles (allowedRoles) {
    return function (req, res, next) {
        if (req.user && allowedRoles.includes(req.user.roleId)) {
            next()
        } else {
            res.status(403).send('Access Denied: You don\'t have the required role!')
        }
    }
}

module.exports = {
    authenticate,
    requireRoles
}
