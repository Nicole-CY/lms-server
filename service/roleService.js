const Role = require('../models/role');
const logger = require("../common/logSetting");

/**
 * Find a role by its name.
 * @param {string} roleName - The name of the role to find.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const getRoleByNameAsync = async (roleName) => {
    try {
      const role = await Role.findOne({
        where: { role_name: roleName },
      });
  
      if (!role) {
        return { isSuccess: false, message: "Role not found", data: { id: 0 } };
      }
  
      return { isSuccess: true, message: "", data: role };
    } catch (error) {
      logger.error("getRoleByNameAsync error:", error);
      return { isSuccess: false, message: "Server error", data: null };
    }
  };

/**
 * Retrieve all roles from the database.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object[]|null}>}
 */
const getAllRolesAsync = async () => {
  try {
    const roles = await Role.findAll();

    return { isSuccess: true, message: "", data: roles };
  } catch (error) {
    logger.error("getAllRolesAsync error:", error);
    return { isSuccess: false, message: "Server error", data: null };
  }
};

/**
 * Add a new role to the database.
 * @param {{ role_name: string, description?: string }} role - The role data to add.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const addRoleAsync = async (role) => {
    try {
      const newRole = await Role.create({
        role_name: role.role_name,
        description: role.description || "", 
      });
  
      return { isSuccess: true, message: "", data: newRole };
    } catch (error) {
      logger.error("addRoleAsync error:", error);
      return { isSuccess: false, message: "Add role failed", data: null };
    }
  };

/**
 * Update an existing role by ID.
 * @param {number} roleId - The ID of the role to update.
 * @param {{ role_name?: string, description?: string }} updatedData - The updated role data.
 * @returns {Promise<{isSuccess: boolean, message: string, data: object|null}>}
 */
const updateRoleAsync = async (roleId, updatedData) => {
  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return { isSuccess: false, message: "Role not found", data: null };
    }

    await role.update({
      role_name: updatedData.role_name || role.role_name,
      description: updatedData.description || role.description,
    });

    return { isSuccess: true, message: "", data: role };
  } catch (error) {
    logger.error("updateRoleAsync error:", error);
    return { isSuccess: false, message: "Update role failed", data: null };
  }
};

/**
 * Delete a role by its ID.
 * @param {number} roleId - The ID of the role to delete.
 * @returns {Promise<{isSuccess: boolean, message: string, data: null}>}
 */
const deleteRoleAsync = async (roleId) => {
  try {
    const role = await Role.findByPk(roleId);

    if (!role) {
      return { isSuccess: false, message: "Role not found", data: null };
    }

    await role.destroy();

    return { isSuccess: true, message: "Role deleted successfully", data: null };
  } catch (error) {
    logger.error("deleteRoleAsync error:", error);
    return { isSuccess: false, message: "Delete role failed", data: null };
  }
};
  
module.exports = { 
    getRoleByNameAsync,
    getAllRolesAsync,
    addRoleAsync,
    updateRoleAsync,
    deleteRoleAsync
};