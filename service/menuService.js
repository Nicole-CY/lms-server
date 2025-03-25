const Menu = require("../models/menu");
const logger = require("../common/logsetting");

const createMenuAsync = async (menu) => {
  try {
    const newMenu = await Menu.create({
      menu_name: menu.menuName,
      parent_id: menu.parentId,
      route_path: menu.routePath,
    });

    return { isSuccess: true, message: "", data: newMenu };
  } catch (error) {
    logger.error("createMenuAsync error:", error);
    return { isSuccess: false, message: "Create menu failed", data: null };
  }
};

const getMenuAsync = async () => {
  try {
    const allMenu = await Menu.findAll();
    return { isSuccess: true, message: "", data: allMenu };
  } catch (error) {
    logger.error("getMenuAsync error:", error);
    return { isSuccess: false, message: "Server error", data: null };
  }
};

module.exports = {
  createMenuAsync,
  getMenuAsync,
};
