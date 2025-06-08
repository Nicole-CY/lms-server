const menuService = require('../services/menuService');

// Get menu list
const getMenuListAsync = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const search = req.query.search || '';

    const result = await menuService.getMenuListAsync(page, pageSize, search);

    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Menu list retrieved', 1);
    } else {
        res.sendCommonValue({}, 'No menus found', 0);
    }
};

// Get menu by id
const getMenuByIdAsync = async (req, res) => {
    const id = parseInt(req.query.id, 10);

    const result = await menuService.getMenuByIdAsync(id);

    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Menu found', 1);
    } else {
        res.sendCommonValue([], 'Menu not found', 0);
    }
};

// Get menu by name
const getMenuByNameAsync = async (req, res, next) => {
    try {
        const { menuName } = req.query;
        const result = await menuService.getMenuByNameAsync(menuName);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Menu found', 1);
        } else {
            res.sendCommonValue({}, 'Menu not found', 0);
        }
    } catch (error) {
        next(error);
    }
};

// Add new menu
const addMenuAsync = async (req, res) => {
    const { menuName, parentId } = req.body; // icon should be included if needed

    // 1. check if menuName exist
    const checkMenuNameResult = await menuService.getMenuByNameAsync(menuName);
    if (checkMenuNameResult.isSuccess) {
        return res.sendCommonValue({}, 'Menu name already exists', 0);
    }

    // 2. check parentId
    if (parentId !== null && parentId !== undefined && parentId !== 0) {
        const parentMenuResult = await menuService.getMenuByIdAsync(parentId);
        if (
            !parentMenuResult.isSuccess ||
            !parentMenuResult.data ||
            parentMenuResult.data.id === 0
        ) {
            return res.sendCommonValue({}, 'Parent menu does not exist', 0);
        }
    }

    // 3. control menu data
    const menu = {
        menuName: req.body.menuName,
        parentId: req.body.parentId ?? null,
        routePath: req.body.routePath,
        componentPath: req.body.componentPath || null,
        menuType: req.body.menuType || 'page',
        sortOrder: req.body.sortOrder || 0,
        permission: req.body.permission || null,
        icon: req.body.icon || null,
    };

    // 4. create menu
    const result = await menuService.addMenuAsync(menu);

    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Menu added successfully', 1);
    } else {
        res.sendCommonValue({}, 'Failed to add menu', 0);
    }
};

// Update menu by id
const updateMenuByIdAsync = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const newMenuData = req.body;

    const checkMenuNameResult = await menuService.getMenuByNameAsync(newMenuData.menuName);
    if (checkMenuNameResult.isSuccess && checkMenuNameResult.data.id !== id) {
        return res.sendCommonValue({}, 'Menu name already exists', 0);
    }

    const updateMenuResult = await menuService.updateMenuByIdAsync(id, newMenuData);

    if (updateMenuResult.isSuccess) {
        res.sendCommonValue(updateMenuResult.data, 'Menu updated successfully', 1);
    } else {
        res.sendCommonValue({}, 'Failed to update menu', 0);
    }
};

// Delete menu by id (with children)
const deleteMenuByIdAsync = async (req, res) => {
    const { id } = req.params;
    const result = await menuService.deleteMenuByIdAsync(id);

    if (result.isSuccess) {
        res.sendCommonValue({}, 'Menu deleted successfully', 1);
    } else {
        res.sendCommonValue({}, 'Menu not found', 0);
    }
};

// Get menu tree
const getMenuTreeAsync = async (req, res) => {
    const result = await menuService.getMenuTreeAsync();

    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Menu tree retrieved', 1);
    } else {
        res.sendCommonValue({}, 'No menus found', 0);
    }
};

// Get menu by user role
const getMenuByRoleAsync = async (req, res) => {
    const role = req.user?.role || req.query.role;

    if (!role) {
        return res.sendCommonValue({}, 'Missing user role', 0);
    }

    const result = await menuService.getMenuByRoleAsync(role);

    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'Menu loaded by role', 1);
    } else {
        res.sendCommonValue({}, 'Failed to load menu for role', 0);
    }
};

module.exports = {
    getMenuByNameAsync,
    getMenuListAsync,
    addMenuAsync,
    deleteMenuByIdAsync,
    getMenuByIdAsync,
    updateMenuByIdAsync,
    getMenuTreeAsync,
    getMenuByRoleAsync,
};
