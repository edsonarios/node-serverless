const express = require('express')
const router = express.Router()
const roleController = require('../controllers/role')

router.get('/', roleController.getAllRoles)
router.get('/:roleId', roleController.getRoleById)
router.post('/', roleController.createRole)

module.exports = router
