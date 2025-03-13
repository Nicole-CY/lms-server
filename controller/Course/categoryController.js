const CategoryService = require("../../service/Course/categoryService");

const getCategoryListAsync = async (req, res) => {
  const page = parseInt(req.params.page);
  const pageSize = parseInt(req.params.pageSize);
  const result = await CategoryService.getCategoryListAsync(page, pageSize);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue([], "failed", 0);
  }
};

module.exports = {
  getCategoryListAsync,
};
