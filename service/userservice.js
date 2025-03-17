const User = require("../models/user");
const logger = require("../common/logsetting");

const getUserbyNameAsync = async (name) => {
  try {
    const user = await User.findOne({
      where: { username: name },
    });

    if (!user) {
      return { isSuccess: false, message: "User not found", data: { id: 0 } };
    }

    return { isSuccess: true, message: "", data: user };
  } catch (error) {
    logger.error("getUserbyNameAsync error:", error);
    return { isSuccess: false, message: "Server error", data: null };
  }
};

const addUserAsync = async (user) => {
  try {
    const newUser = await User.create({
      username: user.username,
      password: user.password,
      email: user.email,
      address: user.address,
      age: user.age,
      gender: user.gender,
      avatar: user.avatar,
      nickname: user.nickname,
      active: user.active ?? true,  
      access: user.access || "user", 
    });

    return { isSuccess: true, message: "", data: newUser };
  } catch (error) {
    logger.error("addUserAsync error:", error);
    return { isSuccess: false, message: "Add user failed", data: null };
  }
};

const getUserListAsync = async (page = 1, pageSize = 10) => {
  try {
    const { count, rows } = await User.findAndCountAll({
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
    logger.error("getUserListAsync error:", error);
    return { isSuccess: false, message: "Get user list failed", data: null };
  }
};

const delUserByIdAsync = async (idsString) => {
  try {
    const ids = idsString.split(",").map((id) => parseInt(id));

    const result = await User.destroy({
      where: {
        id: ids,
      },
    });

    if (result > 0) {
      return { isSuccess: true, message: "Delete successful" };
    }

    return { isSuccess: false, message: "Delete failed, no user found" };
  } catch (error) {
    logger.error("delUserByIdAsync error:", error);
    return { isSuccess: false, message: "Delete failed", data: null };
  }
};

const uptUserByIdAsync = async (user) => {
  try {
    const result = await User.update(
      {
        username: user.username,
        email: user.email,
        address: user.address,
        age: user.age,
        gender: user.gender,
        avatar: user.avatar,
        nickname: user.nickname,
        active: user.active,
        access: user.access,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    if (result[0] > 0) {
      return { isSuccess: true, message: "Update successful" };
    }

    return { isSuccess: false, message: "Update failed, user not found" };
  } catch (error) {
    logger.error("uptUserByIdAsync error:", error);
    return { isSuccess: false, message: "Update failed", data: null };
  }
};

const checkUserNameAsync = async (username, id) => {
  try {
    const user = await User.findOne({
      where: { username },
    });

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

const getUserbyIdAsync = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return { isSuccess: false, message: "User not found", data: { id: 0 } };
    }

    return { isSuccess: true, message: "", data: user };
  } catch (error) {
    logger.error("getUserbyIdAsync error:", error);
    return { isSuccess: false, message: "Get user failed", data: null };
  }
};

module.exports = {
  getUserbyNameAsync,
  addUserAsync,
  getUserListAsync,
  delUserByIdAsync,
  uptUserByIdAsync,
  checkUserNameAsync,
  getUserbyIdAsync,
};
