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

const addCategoryAsync = async (req, res) => {
  const dbResult = await CategoryService.getCategoryByNameAsync(
    req.body.CategoryName
  );

  if (dbResult.isSuccess && dbResult.data.items.length > 0) {
    res.sendCommonValue({}, "Category name already exists", 400, 400);
    return;
  }

  const result = await CategoryService.addCategoryAsync(req.body);

  if (result.isSuccess) {
    res.sendCommonValue(result, "Category added successfully", 1);
  } else {
    res.sendCommonValue({}, "Category not found", 0);
  }
};

const deleteCategoryByIdAsync = async (req, res) => {
  const ids = req.params.ids;
  const result = await CategoryService.deleteCategoryByIdAsync(ids);

  if (result.isSuccess) {
    res.sendCommonValue({}, "Category deleted successfully", 1);
  } else {
    res.sendCommonValue({}, "Category not found", 0);
  }
};

module.exports = {
  getCategoryListAsync,
  addCategoryAsync,
  deleteCategoryByIdAsync,
};
