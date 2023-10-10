const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/:id', userController.getUser)
router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)

module.exports = router
