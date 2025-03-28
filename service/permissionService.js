const { Op } = require('sequelize');

const Permission = require('../models/permission');
const logger = require('../common/logSetting');
const { getPaginatedResults } = require('../utils/pagination');

const getPermissionListAsync = async (page = 1, pageSize = 10, search = '') => {
    try {
        const where = search ? { permissionName: { [Op.like]: `%${search}%` } } : {};

        const result = await getPaginatedResults(Permission, {
            page,
            pageSize,
            where,
        });
        return result;
    } catch (error) {
        logger.error('getPermissionListAsync error:', error);
        return {
            isSuccess: false,
            message: 'Get permission list failed',
            data: null,
        };
    }
};

// 通过ID获取权限
const getPermissionByIdAsync = async id => {
    try {
        const permission = await Permission.findByPk(id);

        if (!permission) {
            return {
                isSuccess: false,
                message: 'Permission not found',
                data: { id: 0 },
            };
        }

        return { isSuccess: true, message: '', data: permission };
    } catch (error) {
        logger.error('getPermissionByIdAsync error:', error);
        return {
            isSuccess: false,
            message: 'Get permission failed',
            data: null,
        };
    }
};

// 通过名称查找权限（用于检查唯一性）
const getPermissionByNameAsync = async name => {
    try {
        const permission = await Permission.findOne({
            where: { name },
        });

        if (!permission) {
            return {
                isSuccess: false,
                message: 'Permission not found',
                data: { id: 0 },
            };
        }

        return { isSuccess: true, message: '', data: permission };
    } catch (error) {
        logger.error('getPermissionByNameAsync error:', error);
        return {
            isSuccess: false,
            message: 'Server error',
            data: null,
        };
    }
};

// 添加权限
const addPermissionAsync = async permission => {
    try {
        const newPermission = await Permission.create({
            name: permission.name,
            description: permission.description,
        });

        return { isSuccess: true, message: '', data: newPermission };
    } catch (error) {
        logger.error('addPermissionAsync error:', error);
        return {
            isSuccess: false,
            message: 'Add permission failed',
            data: null,
        };
    }
};

// 更新权限
const uptPermissionByIdAsync = async permission => {
    try {
        const result = await Permission.update(
            {
                name: permission.name,
                description: permission.description,
            },
            {
                where: {
                    id: permission.id,
                },
            }
        );

        if (result[0] > 0) {
            return { isSuccess: true, message: 'Update successful' };
        }

        return { isSuccess: false, message: 'Update failed, permission not found' };
    } catch (error) {
        logger.error('uptPermissionByIdAsync error:', error);
        return { isSuccess: false, message: 'Update failed', data: null };
    }
};

// 检查权限名是否存在（可用于更新时检查冲突）
const checkPermissionNameAsync = async (name, id) => {
    try {
        const permission = await Permission.findOne({
            where: { name },
        });

        if (permission && permission.id !== id) {
            return {
                isSuccess: false,
                message: 'Permission name already exists',
                data: permission,
            };
        }

        return { isSuccess: true, message: '', data: null };
    } catch (error) {
        logger.error('checkPermissionNameAsync error:', error);
        return { isSuccess: false, message: 'Check failed', data: null };
    }
};

module.exports = {
    getPermissionListAsync,
    getPermissionByIdAsync,
    getPermissionByNameAsync,
    addPermissionAsync,
    uptPermissionByIdAsync,
    checkPermissionNameAsync,
};
