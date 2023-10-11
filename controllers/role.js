const { RoleModel } = require('../models/modelFactory')

exports.createRole = async (req, res) => {
    const allowedRoles = ['personal', 'admin']
    if (!allowedRoles.includes(req.body.name)) {
        return res.status(400).json({ error: 'Invalid role name' })
    }

    try {
        const roleModel = new RoleModel()
        const role = await roleModel.create(req.body)
        res.status(201).json(role)
    } catch (error) {
        console.error('Error creating role:', error)
        res.status(500).json({ error: 'Failed to create role' })
    }
}

exports.getRoleById = async (req, res) => {
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
