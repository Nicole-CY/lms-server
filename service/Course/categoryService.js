const { sequelize } = require("../../db/sequelizedb");
const Category = require("../../models/category");

const getCategoryListAsync = async (page, pageSize) => {
  let result = {
    isSuccess: true,
    message: "",
    data: {
      items: [],
      total: 0,
    },
  };
  const total = await Category.count();

  if (total === 0) return result;

  const offset = (page - 1) * pageSize;
  const categories = await Category.findAll({
    offset,
    limit: pageSize,
  });

  result = {
    isSuccess: true,
    message: "",
    data: {
      items: categories,
      total: total,
    },
  };

  return result;
};

module.exports = { getCategoryListAsync };
