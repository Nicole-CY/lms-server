const { Op } = require('sequelize');

const { cache } = require('../utils/cache');
const { User, Role } = require('../models');
const logger = require('../common/logSetting');
const { getPaginatedResults } = require('../utils/pagination');

// Get user list
const getUserListAsync = async (page = 1, pageSize = 10, searchTerm = '') => {
    const cacheKey = `user:list:page=${page}:size=${pageSize}`;

    try {
        const where = searchTerm
            ? {
                  [Op.or]: [
                      { firstName: { [Op.like]: `%${searchTerm}%` } },
                      { lastName: { [Op.like]: `%${searchTerm}%` } },
                      { email: { [Op.like]: `%${searchTerm}%` } },
                      { address: { [Op.like]: `%${searchTerm}%` } },
                  ],
              }
            : {};

        console.log('🔍 [UserService] SearchTerm:', searchTerm);
        console.log('🔍 [UserService] WHERE condition:', JSON.stringify(where, null, 2));

        // use cache only when there is no search term
        if (!searchTerm) {
            const result = await cache(cacheKey, 300, async () => {
                return await getPaginatedResults(User, {
                    where,
                    page,
                    pageSize,
                    attributes: { exclude: ['password'] },
                    include: [
                        {
                            model: Role,
                            attributes: ['roleName'],
                            through: { attributes: [] },
                        },
                    ],
                });
            });

            return {
                isSuccess: true,
                message: 'Success (cached)',
                data: result,
            };
        }

        // skip cache when there is a search term
        const result = await getPaginatedResults(User, {
            where,
            page,
            pageSize,
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    attributes: ['roleName'],
                    through: { attributes: [] },
                },
            ],
        });

        return {
            isSuccess: true,
            message: 'Success (no-cache)',
            data: result,
        };
    } catch (error) {
        logger.error('getUserListAsync error:', error);
        return {
            isSuccess: false,
            message: 'Get user list failed',
            data: null,
        };
    }
};

// Add a new user
const addUserAsync = async user => {
    try {
        await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            address: user.address,
            birthDate: user.birthDate,
            gender: user.gender,
            avatar: user.avatar,
            active: user.active ?? true,
        });

        return { isSuccess: true, message: 'create user successfully', data: null };
    } catch (error) {
        logger.error('addUserAsync error:', error);
        return { isSuccess: false, message: 'Add user failed', data: null };
    }
};

// Get user by id
const getUserByIdAsync = async id => {
    try {
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

        if (!user) {
            return {
                isSuccess: false,
                message: 'User not found',
                data: { id: 0 },
            };
        }

        return { isSuccess: true, message: 'get user by id successfully', data: user };
    } catch (error) {
        logger.error('getUserByIdAsync error:', error);
        return { isSuccess: false, message: 'Get user failed', data: null };
    }
};

// Get user by email
const getUserByEmailAsync = async (email, includePassword = false) => {
    try {
        const user = await User.findOne({
            where: { email },
            attributes: includePassword ? undefined : { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    attributes: ['roleName'],
                    through: { attributes: [] },
                },
            ],
        });
        

        if (!user) {
            return {
                isSuccess: false,
                message: 'User not found',
                data: { id: 0 },
            };
        }

        return { isSuccess: true, message: 'get user by email successfully ', data: user };
    } catch (error) {
        logger.error('getUserByEmailAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

// Get filtered user list
const getFilteredUserListAsync = async (
    page = 1,
    pageSize = 10,
    search = '',
    allowedRoles = []
) => {
    try {
        const whereCondition = {
            roles: { [Op.overlap]: allowedRoles },
        };

        if (search) {
            whereCondition.username = { [Op.like]: `%${search}%` };
        }

        const { count, rows } = await User.findAndCountAll({
            where: whereCondition,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            attributes: { exclude: ['password'] },
        });

        return {
            isSuccess: true,
            message: '',
            data: {
                items: rows,
                total: count,
            },
        };
    } catch (error) {
        logger.error('getFilteredUserListAsync error:', error);
        return {
            isSuccess: false,
            message: 'Get filtered user list failed',
            data: null,
        };
    }
};

// Update user by id
const updateUserByIdAsync = async user => {
    try {
        const existingUser = await User.findByPk(user.id);
        if (!existingUser) {
            return { isSuccess: false, message: 'User not found', data: null };
        }

        const result = await User.update(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                address: user.address,
                birthDate: user.birthDate,
                gender: user.gender,
                avatar: user.avatar,
                active: user.active,
            },
            { where: { id: user.id } }
        );

        if (result[0] > 0) {
            return { isSuccess: true, message: 'Update successful' };
        }

        return { isSuccess: false, message: 'Update failed' };
    } catch (error) {
        logger.error('updateUserByIdAsync error:', error);
        return { isSuccess: false, message: 'Update failed', data: null };
    }
};

// Check username
const checkUsernameAsync = async (username, id) => {
    try {
        const user = await User.findOne({ where: { username } });

        if (user && user.id !== id) {
            return {
                isSuccess: false,
                message: 'Username already exists',
                data: user,
            };
        }

        return { isSuccess: true, message: '', data: null };
    } catch (error) {
        logger.error('checkUsernameAsync error:', error);
        return { isSuccess: false, message: 'Check failed', data: null };
    }
};

// Delete user by id
const deleteUserByIdAsync = async idsString => {
    try {
        const ids = idsString.split(',').map(id => parseInt(id));
        const result = await User.destroy({ where: { id: ids } });

        if (result > 0) {
            return {
                isSuccess: true,
                message: 'Delete successful',
                data: null,
            };
        }

        return { isSuccess: false, message: 'Delete failed, no user found' };
    } catch (error) {
        logger.error('deleteUserByIdAsync error:', error);
        return { isSuccess: false, message: 'Delete failed', data: null };
    }
};

module.exports = {
    addUserAsync,
    getUserListAsync,
    getUserByIdAsync,
    getFilteredUserListAsync,
    getUserByEmailAsync,
    updateUserByIdAsync,
    checkUsernameAsync,
    deleteUserByIdAsync,
};
