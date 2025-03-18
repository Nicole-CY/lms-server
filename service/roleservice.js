const Role = require('../models/role');
const logger = require("../common/logsetting");

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
  
module.exports = { 
    getRoleByNameAsync,
    addRoleAsync
 };