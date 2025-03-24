const menuService = require("../service/menuService");

/**
 * create a new menu
 * @param {*} req
 * @param {*} res
 */
const createMenuAsync = async (req, res) => {
  let menu = {};
  menu.menuName = req.body.menuName;
  menu.parentId = req.body.parentId;
  menu.routePath = req.body.routePath;

  let result = await menuService.createMenuAsync(menu);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue({}, "Create menu failed", 0);
  }
};

/**
 * get all menu
 * @param {*} req
 * @param {*} res
 */
const getMenuAsync = async (req, res) => {
  let result = await menuService.getMenuAsync();
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue({}, "Get menu failed", 0);
  }
};

module.exports = {
  createMenuAsync,
  getMenuAsync,
};
