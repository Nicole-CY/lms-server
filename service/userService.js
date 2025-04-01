const User = require("../models/user");
const logger = require("../common/logSetting");
const { Op } = require("sequelize");


const addUserAsync = async (user) => {
    try {
        const newUser = await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            address: user.address,
            birthDate: user.birthDate,
            gender: user.gender,
            avatar: user.avatar,
            active: user.active ?? true,
            roles: user.roles || ["user"],
        });

        return { isSuccess: true, message: "", data: newUser };
    } catch (error) {
        logger.error("addUserAsync error:", error);
        return { isSuccess: false, message: "Add user failed", data: null };
    }
};


const getUserListAsync = async (page = 1, pageSize = 10, search = "") => {
    try {
        const whereCondition = search
            ? { username: { [Op.like]: `%${search}%` } } // 🔹 支持搜索
            : {};

        const { count, rows } = await User.findAndCountAll({
            where: whereCondition,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            attributes: { exclude: ["password"] }, // 🔹 避免返回敏感信息
        });

        return {
            isSuccess: true,
            message: "",
            data: {
                items: rows,
                total: count,
            },
        };
    } catch (error) {
        logger.error("getUserListAsync error:", error);
        return {
            isSuccess: false,
            message: "Get user list failed",
            data: null,
        };
    }
};



const getUserByNameAsync = async (name) => {
    try {
        const user = await User.findOne({ where: { username: name } });

        if (!user) {
            return {
                isSuccess: false,
                message: "User not found",
                data: { id: 0 },
            };
        }

        return { isSuccess: true, message: "", data: user };
    } catch (error) {
        logger.error("getUserbyNameAsync error:", error);
        return { isSuccess: false, message: "Server error", data: null };
    }
};

const getUserByIdAsync = async (id) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return {
                isSuccess: false,
                message: "User not found",
                data: { id: 0 },
            };
        }

        return { isSuccess: true, message: "", data: user };
    } catch (error) {
        logger.error("getUserbyIdAsync error:", error);
        return { isSuccess: false, message: "Get user failed", data: null };
    }
};


const getUserByEmailAsync = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return {
                isSuccess: false,
                message: "User not found",
                data: { id: 0 },
            };
        }

        return { isSuccess: true, message: "", data: user };
    } catch (error) {
        logger.error("getUserbyEmailAsync error:", error);
        return { isSuccess: false, message: "Server error", data: null };
    }
};


const getFilteredUserListAsync = async (
    page = 1,
    pageSize = 10,
    search = "",
    allowedRoles = []
) => {
    try {
        const whereCondition = {
            roles: { [Op.overlap]: allowedRoles }, // 🔹 限制角色
        };

        if (search) {
            whereCondition.username = { [Op.like]: `%${search}%` };
        }

        const { count, rows } = await User.findAndCountAll({
            where: whereCondition,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            attributes: { exclude: ["password"] },
        });

        return {
            isSuccess: true,
            message: "",
            data: {
                items: rows,
                total: count,
            },
        };
    } catch (error) {
        logger.error("getFilteredUserListAsync error:", error);
        return {
            isSuccess: false,
            message: "Get filtered user list failed",
            data: null,
        };
    }
};



const updateUserByIdAsync = async (user) => {
    try {
        const existingUser = await User.findByPk(user.id);
        if (!existingUser) {
            return { isSuccess: false, message: "User not found", data: null };
        }

        const result = await User.update(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                email: user.email,
                address: user.address,
                birthDate: user.birthDate,
                gender: user.gender,
                avatar: user.avatar,
                active: user.active,
                roles: user.roles,
            },
            { where: { id: user.id } }
        );

        if (result[0] > 0) {
            return { isSuccess: true, message: "Update successful" };
        }

        return { isSuccess: false, message: "Update failed" };
    } catch (error) {
        logger.error("uptUserByIdAsync error:", error);
        return { isSuccess: false, message: "Update failed", data: null };
    }
};


const checkUserNameAsync = async (username, id) => {
    try {
        const user = await User.findOne({ where: { username } });

        if (user && user.id !== id) {
            return {
                isSuccess: false,
                message: "Username already exists",
                data: user,
            };
        }

        return { isSuccess: true, message: "", data: null };
    } catch (error) {
        logger.error("checkUserNameAsync error:", error);
        return { isSuccess: false, message: "Check failed", data: null };
    }
};


const deleteUserByIdAsync = async (idsString) => {
    try {
        const ids = idsString.split(",").map((id) => parseInt(id));
        const result = await User.destroy({ where: { id: ids } });

        if (result > 0) {
            return {
                isSuccess: true,
                message: "Delete successful",
                data: null,
            };
        }

        return { isSuccess: false, message: "Delete failed, no user found" };
    } catch (error) {
        logger.error("deleteUserByIdAsync error:", error);
        return { isSuccess: false, message: "Delete failed", data: null };
    }
};

module.exports = {
    addUserAsync,
    getUserListAsync,
    getUserByNameAsync,
    getUserByIdAsync,
    getFilteredUserListAsync,
    getUserByEmailAsync,
    updateUserByIdAsync,
    checkUserNameAsync,
    deleteUserByIdAsync,

};
