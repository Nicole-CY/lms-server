const { Op } = require('sequelize');

const { BadRequestError } = require('../utils/errors');
const Menu = require('../models/menu');
const pagination = require('../utils/pagination');
const logger = require('../common/logSetting');

// Get menu list
const getMenuListAsync = async (page = 1, pageSize = 10, search = '') => {
    const where = search ? { menuName: { [Op.like]: `%${search}%` } } : {};

    const result = await pagination.getPaginatedResults(Menu, {
        page,
        pageSize,
        where,
    });
    return result;
};

// Get menu by id
const getMenuByIdAsync = async id => {
    const menu = await Menu.findByPk(id);

    if (!menu) {
        throw new BadRequestError('Menu not found');
    }

    return { isSuccess: true, message: '', data: menu };
};

// const getMenuByIdAsync = async id => {
//     try {
//         const menu = await Menu.findByPk(id);

//         if (!menu) {
//             return {
//                 isSuccess: false,
//                 message: 'Menu not found',
//                 data: { id: 0 },
//             };
//         }

//         return { isSuccess: true, message: '', data: menu };
//     } catch (error) {
//         logger.error('getMenuByIdAsync error:', error);
//         return { isSuccess: false, message: 'Get menu failed', data: null };
//     }
// };

// Get menu by name

const getMenuByNameAsync = async name => {
    const menu = await Menu.findOne({ where: { menuName: name } });

    if (!menu) {
        throw new BadRequestError('Menu not found');
    }

    return { isSuccess: true, message: '', data: menu };
};

// const getMenuByNameAsync = async name => {
//     try {
//         const menu = await Menu.findOne({ where: { menuName: name } });

//         if (!menu) {
//             return {
//                 isSuccess: false,
//                 message: 'Menu not found',
//                 data: { id: 0 },
//             };
//         }

//         return { isSuccess: true, message: '', data: menu };
//     } catch (error) {
//         logger.error('getMenuByNameAsync error:', error);
//         return { isSuccess: false, message: 'Server error', data: null };
//     }
// };

// Add new menu
const addMenuAsync = async menu => {
    try {
        const newMenu = await Menu.create({
            menuName: menu.menuName,
            parentId: menu.parentId,
            routePath: menu.routePath,
            componentPath: menu.componentPath,
            menuType: menu.menuType || 'page',
            sortOrder: menu.sortOrder || 0,
            permission: menu.permission || null,
            icon: menu.icon || null,
        });

        return { isSuccess: true, message: '', data: newMenu };
    } catch (error) {
        logger.error('addMenuAsync error:', error);
        throw new BadRequestError('Create menu failed');
    }
};

// const addMenuAsync = async menu => {
//     try {
//         const newMenu = await Menu.create({
//             menuName: menu.menuName,
//             parentId: menu.parentId,
//             routePath: menu.routePath,
//             componentPath: menu.componentPath,
//             menuType: menu.menuType || 'page',
//             sortOrder: menu.sortOrder || 0,
//             permission: menu.permission || null,
//             icon: menu.icon || null,
//         });

//         return { isSuccess: true, message: '', data: newMenu };
//     } catch (error) {
//         logger.error('addMenuAsync error:', error);
//         return { isSuccess: false, message: 'Create menu failed', data: null };
//     }
// };

// Update menu by id
const updateMenuByIdAsync = async (id, updateData) => {
    try {
        const result = await getMenuByIdAsync(id);
        if (!result.isSuccess) return result;

        const menu = await Menu.update(updateData, {
            where: {
                id,
            },
        });

        return {
            isSuccess: true,
            message: 'Menu updated successfully',
            data: menu,
        };
    } catch (error) {
        logger.error('updateMenuByIdAsync error:', error);
        return { isSuccess: false, message: 'Update failed', data: null };
    }
};

// Delete menu by id
const findAllChildMenuIds = async parentIds => {
    const children = await Menu.findAll({
        where: { parentId: parentIds },
        attributes: ['id'],
        raw: true,
    });

    if (children.length === 0) return [];

    const childIds = children.map(c => c.id);
    return [...childIds, ...(await findAllChildMenuIds(childIds))];
};

const deleteMenuByIdAsync = async idsString => {
    const ids = idsString.split(',').map(id => parseInt(id, 10));

    try {
        // 1. Get all descendant ids
        const childIds = await findAllChildMenuIds(ids);
        const allIdsToDelete = [...new Set([...ids, ...childIds])];

        // 2. Delete all
        const deleteCount = await Menu.destroy({
            where: { id: allIdsToDelete },
        });

        return {
            isSuccess: deleteCount > 0,
            message:
                deleteCount > 0
                    ? `Deleted ${deleteCount} menus (including ${childIds.length} children)`
                    : 'No matching menus found',
        };
    } catch (error) {
        logger.error('deleteMenuByIdAsync error:', error);
        return { isSuccess: false, message: 'Delete failed' };
    }
};

// Get menu tree
const getMenuTreeAsync = async () => {
    try {
        const menus = await Menu.findAll();
        const menuTree = createMenuTree(menus);

        return { isSuccess: true, message: '', data: menuTree };
    } catch (error) {
        logger.error('getMenuTreeAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

// Recursive tree builder
const createMenuTree = (menus, parentId = null) => {
    const tree = [];

    if (menus.length === 0) return tree;

    menus
        .filter(menu => menu.parentId === parentId)
        .forEach(menu => {
            const children = createMenuTree(menus, menu.id);
            const newMenu = {
                id: menu.id,
                label: menu.menuName,
                routePath: menu.routePath,
                permission: menu.permission,
                componentPath: menu.componentPath,
                menuType: menu.menuType,
                sortOrder: menu.sortOrder,
                icon: menu.icon || null,
                children: children.length ? children : [],
            };
            if (children.length) {
                newMenu.children = children;
            }
            tree.push(newMenu);
        });

    return tree;
};

module.exports = {
    getMenuByNameAsync,
    getMenuListAsync,
    addMenuAsync,
    getMenuByIdAsync,
    updateMenuByIdAsync,
    deleteMenuByIdAsync,
    getMenuTreeAsync,
};
