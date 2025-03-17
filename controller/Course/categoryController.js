const CategoryService = require("../../service/Course/categoryService");

const getCategoryByNameAsync = async (req, res) => {
  const { name } = req.params;
  const result = await CategoryService.getCategoryByNameAsync(name);

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category found", 1);
  } else {
    res.sendCommonValue({}, "Category not found", 0);
  }
};

const getCategoryListAsync = async (req, res) => {
  const page = parseInt(req.params.page, 10) || 1;
  const pageSize = parseInt(req.params.pageSize, 10) || 10;
  const result = await CategoryService.getCategoryListAsync(page, pageSize);

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category list retrieved", 1);
  } else {
    res.sendCommonValue({}, "No categories found", 0);
  }
};

const addCategoryAsync = async (req, res) => {
  const { CategoryName } = req.body;

  const dbResult = await CategoryService.getCategoryByNameAsync(CategoryName);

  if (dbResult.isSuccess) {
    return res.sendCommonValue({}, "Category name already exists", 0);
  }

  const result = await CategoryService.addCategoryAsync(req.body);

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category added successfully", 1);
  } else {
    res.sendCommonValue({}, "Failed to add category", 0);
  }
};

const deleteCategoryByIdAsync = async (req, res) => {
  const { ids } = req.params;
  const result = await CategoryService.deleteCategoryByIdAsync(ids);

  if (result.isSuccess) {
    res.sendCommonValue({}, "Category deleted successfully", 1);
  } else {
    res.sendCommonValue({}, "Category not found", 0);
  }
};

const getCategoryByIdAsync = async (req, res) => {
  const id = parseInt(req.query.id, 10);
  const result = await CategoryService.getCategoryByIdAsync(id);

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category found", 1);
  } else {
    res.sendCommonValue([], "Category not found", 0);
  }
};

const updateCategoryByIdAsync = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updateData = req.body;

  const result = await CategoryService.updateCategoryByIdAsync(id, updateData);

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category updated successfully", 1);
  } else {
    res.sendCommonValue({}, "Failed to update category", 0);
  }
};

module.exports = {
  getCategoryByNameAsync,
  getCategoryListAsync,
  addCategoryAsync,
  deleteCategoryByIdAsync,
  getCategoryByIdAsync,
  updateCategoryByIdAsync,
};
