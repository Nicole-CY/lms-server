const roleService = require("../service/roleService");

/**
 * Add a new role
 */
const addRoleAsync = async (req, res) => {
  let dbResult = await roleService.getRoleByNameAsync(req.body.role_name);
  if (dbResult.isSuccess && dbResult.data.id > 0) {
    res.sendCommonValue({}, "Role name already exists", 400, 400);
    return;
  }

  let role = {
    role_name: req.body.role_name,
    description: req.body.description || "",
  };

  let result = await roleService.addRoleAsync(role);
  
  if (result.isSuccess) {
    res.sendCommonValue(role, "success", 1);
  } else {
    res.sendCommonValue({}, "Failed to create role", 0);
  }
};

/**
 * Get all roles
 */
const getAllRolesAsync = async (req, res) => {
  const result = await roleService.getAllRolesAsync();
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue([], "Failed to get roles", 0);
  }
};

/**
 * Get role by name
 */
const getRoleByNameAsync = async (req, res) => {
  const roleName = req.params.role_name || req.query.role_name;
  if (!roleName) {
    res.sendCommonValue({}, "Missing role_name parameter", 400, 400);
    return;
  }

  const result = await roleService.getRoleByNameAsync(roleName);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
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
    res.sendCommonValue({}, "Invalid role ID", 400, 400);
    return;
  }

  const updatedData = {
    role_name: req.body.role_name,
    description: req.body.description,
  };

  const result = await roleService.updateRoleAsync(roleId, updatedData);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Role updated successfully", 1);
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
    res.sendCommonValue({}, "Invalid role ID", 400, 400);
    return;
  }

  const result = await roleService.deleteRoleAsync(roleId);
  if (result.isSuccess) {
    res.sendCommonValue({}, "Role deleted successfully", 1);
  } else {
    res.sendCommonValue({}, result.message, 0, 404);
  }
};

module.exports = {
  addRoleAsync,
  getAllRolesAsync,
  getRoleByNameAsync,
  updateRoleAsync,
  deleteRoleAsync,
};