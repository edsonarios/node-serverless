const express = require('express')
const router = express.Router()
const roleController = require('../controllers/role')

router.get('/:roleId', roleController.getRoleById)
router.get('/', roleController.getAllRoles)
router.post('/', roleController.createRole)

module.exports = router
