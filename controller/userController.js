const bcrypt = require('bcryptjs');

const userService = require('../service/userService');
const { bcryptConfig } = require('../appConfig');

const addUserAsync = async (req, res) => {
    const existingEmail = await userService.getUserByEmailAsync(req.body.email);

    if (existingEmail.isSuccess && existingEmail.data.id > 0) {
        return res.sendCommonValue({}, 'Email already exists', 400, 400);
    }

    const user = {};
    user.password = req.body.password;
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.address;
    user.birthDate = req.body.birthDate;
    user.gender = req.body.gender;
    user.avatar = req.body.avatar;
    user.roles = req.body.roles;
    user.active = req.body.active;

    const password = req.body.password;
    const salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
    const encrypPassword = await bcrypt.hash(user.password, salt);
    user.password = encrypPassword;
    const result = await userService.addUserAsync(user);
    if (result.isSuccess) {
        user.password = password;
        res.sendCommonValue(user, 'success', 1);
    } else {
        res.sendCommonValue({}, 'failed', 0);
    }
};

const getUserListAsync = async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const result = await userService.getUserListAsync(page, pageSize);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue([], 'failed', 0);
    }
};

const getUserByNameAsync = async (req, res) => {
    const username = req.params.userName;
    const result = await userService.getUserbyNameAsync(username);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue({}, result.message, 0);
    }
};

const getUserByIdAsync = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await userService.getUserbyIdAsync(id);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue([], 'failed', 0);
    }
};

const updateUserAsync = async (req, res) => {
    // check username not in db
    const user = {};
    user.id = req.body.id;
    user.username = req.body.username;
    user.email = req.body.email;
    user.address = req.body.address;
    user.birthDate = req.body.birthDate;
    user.gender = req.body.gender;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.avatar = req.body.avatar;
    user.roles = req.body.roles;
    user.active = req.body.active;

    const checkUserResult = await userService.checkUserNameAsync(user.username, user.id);
    if (!checkUserResult.isSuccess) {
        res.sendCommonValue({}, 'Username already exists', 400, 400);
        return;
    }
    const dbResult = await userService.updateUserByIdAsync(user);
    if (dbResult.isSuccess) {
        res.sendCommonValue(user, 'success', 1);
        return;
    } else {
        res.sendCommonValue({}, 'failed', 0);
    }
};

const deleteUserByIdAsync = async (req, res) => {
    const ids = req.params.ids;
    const result = await userService.deleteUserByIdAsync(ids);
    if (result.isSuccess) {
        res.sendCommonValue({}, 'success', 1);
    } else {
        res.sendCommonValue({}, 'failed', 0);
    }
};

module.exports = {
    addUserAsync,
    getUserListAsync,
    getUserByNameAsync,
    getUserByIdAsync,
    updateUserAsync,
    deleteUserByIdAsync,
};
