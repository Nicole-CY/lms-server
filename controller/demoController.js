const demoService = require("../service/demoService");

/**
 * add demo
 * @param {*} req
 * @param {*} res
 */
const createAsync = async (req, res) => {
  let demo = {};
  demo.title = req.body.title;
  demo.mark = req.body.mark;
  demo.count = req.body.count;
  demo.active = req.body.active;
  demo.dataTime = req.body.dataTime;

  let result = await demoService.createAsync(demo);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue({}, "", 0);
  }
};

/**
 * get all demo
 * @param {*} req 
 * @param {*} res 
 */
const getAllAsync = async (req, res) => {
  let result = await demoService.getAllAsync();
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue({}, "", 0);
  }
};

module.exports = {
  createAsync,
  getAllAsync,
};
