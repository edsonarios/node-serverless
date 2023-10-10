const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/users/:userId', userController.getUser)
router.get('/users', userController.getAllUsers)
router.post('/users', userController.createUser)

module.exports = router
