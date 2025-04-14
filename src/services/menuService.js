const Menu = require('../models/menu');
const logger = require('../common/logSetting');

const createMenuAsync = async menu => {
    try {
        const newMenu = await Menu.create({
            menu_name: menu.menuName,
            parent_id: menu.parentId,
            route_path: menu.routePath,
        });

        return { isSuccess: true, message: '', data: newMenu };
    } catch (error) {
        logger.error('createMenuAsync error:', error);
        return { isSuccess: false, message: 'Create menu failed', data: null };
    }
};

const getMenuByIdAsync = async menuId => {
    try {
        const menu = await Menu.findOne({ where: { id: menuId } });

        if (!menu) {
            return {
                isSuccess: false,
                message: 'Menu id not found',
                data: { id: 0 },
            };
        }

        return { isSuccess: true, message: '', data: menu };
    } catch (error) {
        logger.error('getMenuByIdAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

const getMenuAsync = async () => {
    try {
        const allMenu = await Menu.findAll();
        return { isSuccess: true, message: '', data: allMenu };
    } catch (error) {
        logger.error('getMenuAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

module.exports = {
    createMenuAsync,
    getMenuByIdAsync,
    getMenuAsync,
};
