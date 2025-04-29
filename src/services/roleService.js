const Role = require('../models/role');
const User = require('../models/user');
const UserRole = require('../models/userRole');
const logger = require('../common/logSetting');
const { ForbiddenError } = require('../utils/errors');

/**
 * Asynchronously checks whether a given user has permission to perform CRUD operations on roles.
 * Only users with the 'SuperAdmin' role are permitted to perform these operations.
 *
 * @param {Object} user - The user object containing at least an `id` property.
 * @returns {Promise<Object>} An object containing:
 *   - `isAllowed` (boolean): True if user has SuperAdmin permissions, false otherwise.
 *   - `message` (string): An error or forbidden message if not allowed, empty if allowed.
 *
 * @throws Logs an error internally and returns an error message if the permission check fails.
 */
const checkCrudPermissionAsync = async operatorRoles => {
    let isSuperAdmin;

    try {
        isSuperAdmin = operatorRoles.includes('SuperAdmin');
    } catch (error) {
        logger.error('checkRoleCrudPermissionAsync error:', error);
        return {
            isAllowed: false,
            message: 'Server error while checking role management permission.',
        };
    }

    if (!isSuperAdmin) {
        throw new ForbiddenError(
            'Forbidden: Only SuperAdmin can perform role management operations.'
        );
    }
    return { isAllowed: true, message: '' };
};

/**
 * Find a role by its name.
 * @param {string} roleName - The name of the role to find.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const getRoleByIdAsync = async (operatorRoles, id) => {
    // check if operator has the permission to read role
    const permissionCheck = await checkAssignPermissionAsync(operatorRoles);
    if (!permissionCheck.isAllowed) {
        return { isSuccess: false, message: permissionCheck.message, data: null };
    }

    try {
        // read role from database
        const role = await Role.findOne({
            where: { id: id },
        });

        if (!role) {
            return { isSuccess: false, message: 'Role not found', data: { id: 0 } };
        }

        return { isSuccess: true, message: '', data: role };
    } catch (error) {
        logger.error('getRoleByNameAsync error:', error);
        return { isSuccess: false, message: 'Get role failed', data: null };
    }
};

/**
 * Retrieve all roles from the database.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object[]|null}>}
 */
const getAllRolesAsync = async operatorRoles => {
    // check if operator has the permission to read roles
    const permissionCheck = await checkAssignPermissionAsync(operatorRoles);
    if (!permissionCheck.isAllowed) {
        return { isSuccess: false, message: permissionCheck.message, data: null };
    }

    try {
        // read roles from the database
        const roles = await Role.findAll();

        return { isSuccess: true, message: '', data: roles };
    } catch (error) {
        logger.error('getAllRolesAsync error:', error);
        return { isSuccess: false, message: 'Get roles failed', data: null };
    }
};

/**
 * Add a new role to the database.
 * @param {{ roleName: string, description?: string }} role - The role data to add.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const addRoleAsync = async (operatorRoles, role) => {
    // check if operator has the permission to create role
    const permissionCheck = await checkCrudPermissionAsync(operatorRoles);
    if (!permissionCheck.isAllowed) {
        return { isSuccess: false, message: permissionCheck.message, data: null };
    }

    try {
        // create new role
        const newRole = await Role.create({
            roleName: role.roleName,
            description: role.description || '',
        });

        return { isSuccess: true, message: '', data: newRole };
    } catch (error) {
        logger.error('addRoleAsync error:', error);
        return { isSuccess: false, message: 'Add role failed', data: null };
    }
};

/**
 * Update an existing role by ID.
 * @param {number} roleId - The ID of the role to update.
 * @param {{ roleName?: string, description?: string }} updatedData - The updated role data.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const updateRoleAsync = async (operatorRoles, roleId, updatedData) => {
    // check if operator has the permission to update role
    const permissionCheck = await checkCrudPermissionAsync(operatorRoles);
    if (!permissionCheck.isAllowed) {
        return { isSuccess: false, message: permissionCheck.message, data: null };
    }

    try {
        // check if the role user want to update exist in database
        const role = await Role.findByPk(roleId);
        if (!role) {
            return { isSuccess: false, message: 'Role not found', data: null };
        }

        // update the role
        await role.update({
            roleName: updatedData.roleName || role.roleName,
            description: updatedData.description || role.description,
        });

        return { isSuccess: true, message: '', data: role };
    } catch (error) {
        logger.error('updateRoleAsync error:', error);
        return { isSuccess: false, message: 'Update role failed', data: null };
    }
};

/**
 * Delete a role by its ID.
 * @param {number} roleId - The ID of the role to delete.
 * @returns {Promise<{isSuccess: boolean, message: string, data: null}>}
 */
const deleteRoleAsync = async (operatorRoles, roleId) => {
    // check if operator has the permission to delete role
    const permissionCheck = await checkCrudPermissionAsync(operatorRoles);
    if (!permissionCheck.isAllowed) {
        return { isSuccess: false, message: permissionCheck.message, data: null };
    }

    try {
        // check if the role operator want to delete exist in database
        const role = await Role.findByPk(roleId);
        if (!role) {
            return { isSuccess: false, message: 'Role not found', data: null };
        }

        // delete the role
        await role.destroy();

        return { isSuccess: true, message: 'Role deleted successfully', data: null };
    } catch (error) {
        logger.error('deleteRoleAsync error:', error);
        return { isSuccess: false, message: 'Delete role failed', data: null };
    }
};

/**
 * Check if the current operator has permission to assign the given roles.
 * - SuperAdmin can assign any role.
 * - Admin can only assign 'Teacher' and 'Student'.
 * - Others cannot assign any roles.
 *
 * @param {object} operator - The currently logged-in user (must contain id).
 * @param {object[]} rolesToAssign - Array of Sequelize Role instances to be assigned.
 * @returns {Promise<{ isAllowed: boolean, message: string }>}
 */
const checkAssignPermissionAsync = async (operatorRoles, rolesToAssign = []) => {
    let isSuperAdmin;
    let isAdmin;
    try {
        isSuperAdmin = operatorRoles.includes('SuperAdmin');
        isAdmin = operatorRoles.includes('Admin');
    } catch (error) {
        logger.error('checkOperatorPermissionAsync error:', error);
        return {
            isAllowed: false,
            message: 'Server error while checking permission.',
        };
    }
    // admin but not superadmin
    if (!isSuperAdmin && isAdmin) {
        const forbidden = rolesToAssign.find(r => ['Admin', 'SuperAdmin'].includes(r.roleName));
        if (forbidden) {
            throw new ForbiddenError('Forbidden: Admin cannot assign Admin or SuperAdmin roles.');
        }
    }

    // normal user
    if (!isSuperAdmin && !isAdmin) {
        throw new ForbiddenError('Forbidden: Only Admin or SuperAdmin can assign roles.');
    }

    return { isAllowed: true, message: '' };
};

/**
 * Assign new roles to a user without removing existing roles.
 * Prevents duplicate assignments and checks operator permissions.
 *
 * @param {object} operator - The user performing the operation.
 * @param {number} userId - The ID of the user to assign roles to.
 * @param {number[]} roleIds - Array of role IDs to assign.
 * @returns {Promise<{ isSuccess: boolean, message: string, data: null }>}
 */
const assignRolesToUserAsync = async (operatorRoles, userId, roleIds) => {
    // Check if roles user passed exist
    const rolesToAssign = await Role.findAll({ where: { id: roleIds } });
    if (!rolesToAssign || rolesToAssign.length === 0) {
        return { isSuccess: false, message: 'No valid roles found.', data: null };
    }

    // Check permission based on operator's roles
    const permissionCheck = await checkAssignPermissionAsync(operatorRoles, rolesToAssign);
    if (!permissionCheck.isAllowed) {
        return { isSuccess: false, message: permissionCheck.message, data: null };
    }

    try {
        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return {
                isSuccess: false,
                message: `User with id ${userId} does not exist.`,
                data: null,
            };
        }

        // Get current roles of the user
        const existingUserRoles = await UserRole.findAll({ where: { userId: userId } });
        const existingRoleIds = new Set(existingUserRoles.map(r => r.role_id));

        // Filter out roles that are already assigned
        const newRoleIds = roleIds.filter(roleId => !existingRoleIds.has(roleId));
        if (newRoleIds.length === 0) {
            return { isSuccess: true, message: 'All roles already assigned.', data: null };
        }

        // Create new role assignments
        const newEntries = newRoleIds.map(roleId => ({
            userId: userId,
            roleId: roleId,
        }));
        await UserRole.bulkCreate(newEntries);

        return {
            isSuccess: true,
            message: 'Roles assigned successfully.',
            data: null,
        };
    } catch (error) {
        logger.error('assignRolesToUserAsync error:', error);
        return {
            isSuccess: false,
            message: 'Server error while assigning roles.',
            data: null,
        };
    }
};

module.exports = {
    getRoleByIdAsync,
    getAllRolesAsync,
    addRoleAsync,
    updateRoleAsync,
    deleteRoleAsync,
    assignRolesToUserAsync,
};
