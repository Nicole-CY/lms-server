const permissionService = require("../service/permissionService");

const addPermissionAsync = async (req, res) => {
  const { name, description } = req.body;

  const existing = await permissionService.getPermissionByNameAsync(name);
  if (existing.isSuccess && existing.data.id > 0) {
    return res.sendCommonValue({}, "Permission name already exists", 400, 400);
  }

  const result = await permissionService.addPermissionAsync({ name, description });
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue({}, "Add failed", 0);
  }
};

const getPermissionListAsync = async (req, res) => {
  let page = parseInt(req.params.page);
  let pageSize = parseInt(req.params.pageSize);
  let result = await permissionService.getPermissionListAsync(page, pageSize);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue([], "failed", 0);
  }
};

const delPermissionByIdAsync = async (req, res) => {
  let ids = req.params.ids;
  let result = await permissionService.delPermissionByIdAsync(ids);
  if (result.isSuccess) {
    res.sendCommonValue({}, "success", 1);
  } else {
    res.sendCommonValue({}, "failed", 0);
  }
};

const updatePermissionAsync = async (req, res) => {
  let permission = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
  };

  const checkResult = await permissionService.checkPermissionNameAsync(permission.name, permission.id);
  if (!checkResult.isSuccess) {
    res.sendCommonValue({}, "Permission name already exists", 400, 400);
    return;
  }

  const dbResult = await permissionService.uptPermissionByIdAsync(permission);
  if (dbResult.isSuccess) {
    res.sendCommonValue(permission, "success", 1);
  } else {
    res.sendCommonValue({}, "Update failed", 0);
  }
};

const getPermissionByIdAsync = async (req, res) => {
  let id = parseInt(req.query.id);
  let result = await permissionService.getPermissionByIdAsync(id);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue({}, "failed", 0);
  }
};

module.exports = {
  addPermissionAsync,
  getPermissionListAsync,
  delPermissionByIdAsync,
  updatePermissionAsync,
  getPermissionByIdAsync,
};
