const { RoleModel, CounterModel } = require('../models/modelFactory')

exports.createRole = async (req, res) => {
    try {
        const roleModel = new RoleModel()
        const counterModel = new CounterModel()
        const roleId = await counterModel.getNextId('Roles')
        const roleData = {
            ...req.body,
            id: roleId
        }
        const role = await roleModel.create(roleData)
        res.status(201).json(role)
    } catch (error) {
        console.error('Error creating role:', error)
        res.status(500).json({ error: 'Failed to create role' })
    }
}

exports.getRole = async (req, res) => {
    try {
        const roleModel = new RoleModel()
        const role = await roleModel.findById(req.params.roleId)
        if (role) {
            res.status(200).json(role)
        } else {
            res.status(404).json({ error: 'Role not found' })
        }
    } catch (error) {
        console.error('Error fetching role:', error)
        res.status(500).json({ error: 'Could not retrieve role' })
    }
}

exports.getAllRoles = async (req, res) => {
    try {
        const roleModel = new RoleModel()
        const roles = await roleModel.findAll()
        res.status(200).json(roles)
    } catch (error) {
        console.error('Error fetching all roles:', error)
        res.status(500).json({ error: 'Failed to retrieve roles' })
    }
}
