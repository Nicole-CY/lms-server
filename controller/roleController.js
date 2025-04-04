const roleService = require('../service/roleService');

/**
 * Add a new role
 */
const addRoleAsync = async (req, res) => {
    const dbResult = await roleService.getRoleByNameAsync(req.body.role_name);
    if (dbResult.isSuccess && dbResult.data.id > 0) {
        res.sendCommonValue({}, 'Role name already exists', 400, 400);
        return;
    }

    const role = {
        role_name: req.body.role_name,
        description: req.body.description || '',
    };

    const result = await roleService.addRoleAsync(req.user, role);

    if (result.isSuccess) {
        res.sendCommonValue(role, 'success', 1);
    } else {
        res.sendCommonValue({}, 'Failed to create role', 0);
    }
};

/**
 * Get all roles
 */
const getAllRolesAsync = async (req, res) => {
    const result = await roleService.getAllRolesAsync(req.user);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue([], 'Failed to get roles', 0);
    }
};

/**
 * Get role by name
 */
const getRoleByNameAsync = async (req, res) => {
    const roleName = req.params.role_name || req.query.role_name;
    if (!roleName) {
        res.sendCommonValue({}, 'Missing role_name parameter', 400, 400);
        return;
    }

    const result = await roleService.getRoleByNameAsync(req.user, roleName);
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
    if (!roleId) {
        res.sendCommonValue({}, 'Invalid role ID', 400, 400);
        return;
    }

    const updatedData = {
        role_name: req.body.role_name,
        description: req.body.description,
    };

    const result = await roleService.updateRoleAsync(req.user, roleId, updatedData);
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
    if (!roleId) {
        res.sendCommonValue({}, 'Invalid role ID', 400, 400);
        return;
    }

    const result = await roleService.deleteRoleAsync(req.user, roleId);
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
    const operator = req.user;
    const operatorRoles = req.roles;

    if (!userId || !Array.isArray(roleIds) || roleIds.length === 0) {
        res.sendCommonValue({}, 'Invalid user ID or role IDs', 400, 400);
        return;
    }

    const result = await roleService.assignRolesToUserAsync(
        operator,
        operatorRoles,
        userId,
        roleIds
    );

    if (result.isSuccess) {
        res.sendCommonValue({}, result.message, 1);
    } else {
        res.sendCommonValue({}, result.message, 0, 403);
    }
};

module.exports = {
    addRoleAsync,
    getAllRolesAsync,
    getRoleByNameAsync,
    updateRoleAsync,
    deleteRoleAsync,
    assignRolesToUserAsync,
};
