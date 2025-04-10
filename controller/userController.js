const bcrypt = require('bcryptjs');

const userService = require('../service/userService');
const { bcryptConfig } = require('../appConfig');

const addUserAsync = async (req, res) => {
    const existingEmail = await userService.getUserByEmailAsync(req.body.email);

    if (existingEmail.isSuccess && existingEmail.data.id > 0) {
        return res.sendCommonValue({}, 'Email already exists', 400, 400);
    }

    const user = {
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        avatar: req.body.avatar,
        roles: req.body.roles,
        active: req.body.active,  
    };
    
    


    const salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
    const encrypPassword = await bcrypt.hash(user.password, salt);
    user.password = encrypPassword;

    const result = await userService.addUserAsync(user);
    
    if (result.isSuccess) {
        res.sendCommonValue({}, 'success', 1);
    } else {
        res.sendCommonValue({}, 'failed', 0);
    }
};

const getUserListAsync = async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const search = req.query.search;
    
    const result = await userService.getUserListAsync(page, pageSize, search);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue([], 'failed', 0);
    }
};



const getUserByIdAsync = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await userService.getUserByIdAsync(id);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue([], 'failed', 0);
    }
};

const updateUserAsync = async (req, res) => {
    const userId = parseInt(req.params.id);
    const checkResult = await userService.getUserByIdAsync(userId);
    if (!checkResult.isSuccess || !checkResult.data || checkResult.data.id <= 0) {
        res.sendCommonValue({}, 'user not found', 400, 400);
        return;
    }
    
    const updateData = {
        id: userId,
        password: req.body.password,
        address: req.body.address,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        roles: req.body.roles,
        active: req.body.active,
        //update email prohibited
    }
    if(!updateData.password) {
        delete updateData.password;
    }

    const dbResult = await userService.updateUserByIdAsync(updateData);

    if (dbResult.isSuccess) {
        res.sendCommonValue({}, 'update user successfully', 1);
    } else {
        res.sendCommonValue({}, 'failed to update user', 0);
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
    getUserByIdAsync,
    updateUserAsync,
    deleteUserByIdAsync,
};
