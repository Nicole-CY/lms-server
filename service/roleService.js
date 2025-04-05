const Role = require('../models/role');
const User = require('../models/user');
const UserRole = require('../models/userRole');
const logger = require('../common/logSetting');

const checkCrudPermissionAsync = async user => {
    try {
        const userWithRoles = await User.findByPk(user.id, {
            include: { model: Role, through: { attributes: [] } },
        });

        const roleNames = userWithRoles.Roles.map(r => r.roleName);
        const isSuperAdmin = roleNames.includes('SuperAdmin');

        if (!isSuperAdmin) {
            return {
                isAllowed: false,
                message: 'Forbidden: Only SuperAdmin can perform role management operations.',
            };
        }

        return { isAllowed: true, message: '' };
    } catch (error) {
        logger.error('checkRoleCrudPermissionAsync error:', error);
        return {
            isAllowed: false,
            message: 'Server error while checking role management permission.',
        };
    }
};

/**
 * Find a role by its name.
 * @param {string} roleName - The name of the role to find.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const getRoleByNameAsync = async (user, roleName) => {
    try {
        const permissionCheck = await checkCrudPermissionAsync(user);

        if (!permissionCheck.isAllowed) {
            return { isSuccess: false, message: permissionCheck.message, data: null };
        }

        const role = await Role.findOne({
            where: { role_name: roleName },
        });

        if (!role) {
            return { isSuccess: false, message: 'Role not found', data: { id: 0 } };
        }

        return { isSuccess: true, message: '', data: role };
    } catch (error) {
        logger.error('getRoleByNameAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

/**
 * Retrieve all roles from the database.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object[]|null}>}
 */
const getAllRolesAsync = async user => {
    try {
        const permissionCheck = await checkCrudPermissionAsync(user);

        if (!permissionCheck.isAllowed) {
            return { isSuccess: false, message: permissionCheck.message, data: null };
        }

        const roles = await Role.findAll();

        return { isSuccess: true, message: '', data: roles };
    } catch (error) {
        logger.error('getAllRolesAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

/**
 * Add a new role to the database.
 * @param {{ role_name: string, description?: string }} role - The role data to add.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const addRoleAsync = async (user, role) => {
    try {
        const permissionCheck = await checkCrudPermissionAsync(user);

        if (!permissionCheck.isAllowed) {
            return { isSuccess: false, message: permissionCheck.message, data: null };
        }

        const newRole = await Role.create({
            role_name: role.role_name,
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
 * @param {{ role_name?: string, description?: string }} updatedData - The updated role data.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const updateRoleAsync = async (user, roleId, updatedData) => {
    try {
        const permissionCheck = await checkCrudPermissionAsync(user);
        if (!permissionCheck.isAllowed) {
            return { isSuccess: false, message: permissionCheck.message, data: null };
        }

        const role = await Role.findByPk(roleId);

        if (!role) {
            return { isSuccess: false, message: 'Role not found', data: null };
        }

        await role.update({
            role_name: updatedData.role_name || role.role_name,
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
const deleteRoleAsync = async (user, roleId) => {
    try {
        const permissionCheck = await checkCrudPermissionAsync(user);

        if (!permissionCheck.isAllowed) {
            return { isSuccess: false, message: permissionCheck.message, data: null };
        }

        const role = await Role.findByPk(roleId);

        if (!role) {
            return { isSuccess: false, message: 'Role not found', data: null };
        }

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
const checkAssignPermissionAsync = async (operator, operatorRoles, rolesToAssign) => {
    try {
        const isSuperAdmin = operatorRoles.includes('SuperAdmin');
        const isAdmin = operatorRoles.includes('Admin');

        // admin but not superadmin
        if (!isSuperAdmin && isAdmin) {
            const forbidden = rolesToAssign.find(r => ['Admin', 'SuperAdmin'].includes(r.roleName));
            if (forbidden) {
                return {
                    isAllowed: false,
                    message: 'Forbidden: Admin cannot assign Admin or SuperAdmin roles.',
                };
            }
        }

        // normal user
        if (!isSuperAdmin && !isAdmin) {
            return {
                isAllowed: false,
                message: 'Forbidden: Only Admin or SuperAdmin can assign roles.',
            };
        }

        return { isAllowed: true, message: '' };
    } catch (error) {
        logger.error('checkOperatorPermissionAsync error:', error);
        return {
            isAllowed: false,
            message: 'Server error while checking permission.',
        };
    }
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
const assignRolesToUserAsync = async (operator, operatorRoles, userId, roleIds) => {
    try {
        // Check if roles user passed exist
        const rolesToAssign = await Role.findAll({ where: { id: roleIds } });
        if (!rolesToAssign || rolesToAssign.length === 0) {
            return { isSuccess: false, message: 'No valid roles found.', data: null };
        }

        // Check permission based on operator's roles
        const permissionCheck = await checkAssignPermissionAsync(
            operator,
            operatorRoles,
            rolesToAssign
        );
        if (!permissionCheck.isAllowed) {
            return { isSuccess: false, message: permissionCheck.message, data: null };
        }

        // Get current roles of the user
        const existingUserRoles = await UserRole.findAll({ where: { user_id: userId } });
        const existingRoleIds = new Set(existingUserRoles.map(r => r.role_id));

        // Filter out roles that are already assigned
        const newRoleIds = roleIds.filter(roleId => !existingRoleIds.has(roleId));
        if (newRoleIds.length === 0) {
            return { isSuccess: true, message: 'All roles already assigned.', data: null };
        }

        // Create new role assignments
        const newEntries = newRoleIds.map(roleId => ({
            user_id: userId,
            role_id: roleId,
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
    getRoleByNameAsync,
    getAllRolesAsync,
    addRoleAsync,
    updateRoleAsync,
    deleteRoleAsync,
    assignRolesToUserAsync,
};
