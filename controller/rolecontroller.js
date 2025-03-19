const roleService = require("../service/roleservice");

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



module.exports = { addRoleAsync };