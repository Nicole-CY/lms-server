const Sequelize = require("sequelize");
const sequelizeOP = require("../db/sequelizedb");
const Demo = require("../models/demo");
const redisHelper = require("../common/redisHelper");

/**
 * key
 * @returns all cache key
 */
function getALLCacheKey() {
  return "demo_all";
}

var createAsync = async (demo) => {
  var newDemo = await Demo.create({
    title: demo.title,
    mark: demo.mark,
    count: demo.count,
    active: demo.active,
    dataTime: demo.dataTime,
  });

  await redisHelper.delKey(getALLCacheKey());

  return { isSuccess: true, message: "", data: newDemo };
};

var getAllAsync = async () => {
  let cacheValue = await redisHelper.getKey(getALLCacheKey());
  if (cacheValue) {
    return { isSuccess: true, message: "", data: JSON.parse(cacheValue) };
  }
  var allDemo = await Demo.findAll();
  if (allDemo) {
    await redisHelper.setKey(getALLCacheKey(), JSON.stringify(allDemo), 10);
  }
  return { isSuccess: true, message: "", data: allDemo };
};

module.exports = {
  createAsync,
  getAllAsync,
};
