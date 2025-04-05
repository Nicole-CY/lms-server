const roleService = require('../service/roleService');

/**
 * Add a new role
 */
const addRoleAsync = async (req, res) => {
    const { role_name, description } = req.body;

    // check if role already exist in database
    const dbResult = await roleService.getAllRolesAsync(req.roles);
    const existRoles = dbResult.data || [];
    const roleExists = existRoles.some(
        role => role.toJSON().roleName.toLowerCase() === role_name.toLowerCase()
    );
    if (roleExists) {
        return res.status(400).json({
            status: 400,
            data: {},
            message: 'Role name already exists',
        });
    }

    // add role to database
    const role = {
        role_name: role_name,
        description: description || '',
    };
    const result = await roleService.addRoleAsync(req.roles, role);

    if (result.isSuccess) {
        res.sendCommonValue(role, 'success', 1);
    } else {
        res.sendCommonValue({}, result.message, 0);
    }
};

/**
 * Get all roles
 */
const getAllRolesAsync = async (req, res) => {
    // get roles from database
    const result = await roleService.getAllRolesAsync(req.roles);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue([], result.message, 0);
    }
};

/**
 * Get role by id
 */
const getRoleByIdAsync = async (req, res) => {
    const id = req.params.id || req.query.id;

    // get role from database
    const result = await roleService.getRoleByIdAsync(req.roles, id);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue({}, result.message, 0);
    }
};

/**
 * Update a role by ID
 */
const updateRoleAsync = async (req, res) => {
    const roleId = parseInt(req.params.id);

    // update role in database
    const updatedData = {
        role_name: req.body.role_name,
        description: req.body.description,
    };

    const result = await roleService.updateRoleAsync(req.roles, roleId, updatedData);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Role updated successfully', 1);
    } else {
        res.sendCommonValue({}, result.message, 0);
    }
};

/**
 * Delete a role by ID
 */
const deleteRoleAsync = async (req, res) => {
    const roleId = parseInt(req.params.id);

    // delete role from database
    const result = await roleService.deleteRoleAsync(req.roles, roleId);
    if (result.isSuccess) {
        res.sendCommonValue({}, 'Role deleted successfully', 1);
    } else {
        res.sendCommonValue({}, result.message, 0, 404);
    }
};

/**
 * Assign roles to a user without removing existing ones
 */
const assignRolesToUserAsync = async (req, res) => {
    const { userId, roleIds } = req.body;
    const operatorRoles = req.roles;

    /*  if (!userId || !Array.isArray(roleIds) || roleIds.length === 0) {
        res.sendCommonValue({}, 'Invalid user ID or role IDs', 400, 400);
        return;
    } */

    const result = await roleService.assignRolesToUserAsync(operatorRoles, userId, roleIds);

    if (result.isSuccess) {
        res.sendCommonValue({}, result.message, 1);
    } else {
        res.sendCommonValue({}, result.message, 0, 403);
    }
};

module.exports = {
    addRoleAsync,
    getAllRolesAsync,
    getRoleByIdAsync,
    updateRoleAsync,
    deleteRoleAsync,
    assignRolesToUserAsync,
};
