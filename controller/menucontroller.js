const menuService = require('../service/menuService');

/**
 * create a new menu
 * @param {*} req
 * @param {*} res
 */
const createMenuAsync = async (req, res) => {
    const parentId = req.body.parentId;

    // check if parent ID exist
    if (parentId !== null && parentId !== undefined && parentId !== 0) {
        const parentMenu = await menuService.getMenuByIdAsync(parentId);

        if (!parentMenu.isSuccess || !parentMenu.data || parentMenu.data.id === 0) {
            return res.sendCommonValue({}, 'Parent menu does not exist', 400, 400);
        }
    }

    let menu = {};
    menu.menuName = req.body.menuName;
    menu.parentId = req.body.parentId;
    menu.routePath = req.body.routePath;

    let result = await menuService.createMenuAsync(menu);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue({}, 'Create menu failed', 0);
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
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue({}, 'Get menu failed', 0);
    }
};

module.exports = {
    createMenuAsync,
    getMenuAsync,
};
