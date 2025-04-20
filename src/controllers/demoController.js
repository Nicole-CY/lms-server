const demoService = require('../services/demoService');

/**
 * add demo
 * @param {*} req
 * @param {*} res
 */
const createAsync = async (req, res) => {
    const demo = {};
    demo.title = req.body.title;
    demo.mark = req.body.mark;
    demo.count = req.body.count;
    demo.active = req.body.active;
    demo.dataTime = req.body.dataTime;

    const result = await demoService.createAsync(demo);
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue({}, '', 0);
    }
};

/**
 * get all demo
 * @param {*} req
 * @param {*} res
 */
const getAllAsync = async (req, res) => {
    const result = await demoService.getAllAsync();
    if (result.isSuccess) {
        res.sendCommonValue(result.data, 'success', 1);
    } else {
        res.sendCommonValue({}, '', 0);
    }
};

module.exports = {
    createAsync,
    getAllAsync,
};
