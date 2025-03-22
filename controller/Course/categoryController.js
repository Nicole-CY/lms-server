const CategoryService = require("../../service/Course/categoryService");

// Get categories by name
const getCategoryByNameAsync = async (req, res) => {
  const { categoryname } = req.query;

  const result = await CategoryService.getCategoryByNameAsync(categoryname);

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category found", 1);
  } else {
    res.sendCommonValue({}, "Category not found", 0);
  }
};

// Get categories lists
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

// Add categories
const addCategoryAsync = async (req, res) => {
  const { categoryName } = req.body;

  const dbResult = await CategoryService.getCategoryByNameAsync(categoryName);

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

// Delete categories by id
const deleteCategoryByIdAsync = async (req, res) => {
  const { ids } = req.params;
  const result = await CategoryService.deleteCategoryByIdAsync(ids);

  if (result.isSuccess) {
    res.sendCommonValue({}, "Category deleted successfully", 1);
  } else {
    res.sendCommonValue({}, "Category not found", 0);
  }
};

// Get categories by id
const getCategoryByIdAsync = async (req, res) => {
  const id = parseInt(req.query.id, 10);

  const result = await CategoryService.getCategoryByIdAsync(id);

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category found", 1);
  } else {
    res.sendCommonValue([], "Category not found", 0);
  }
};

// Update categories by id
const updateCategoryByIdAsync = async (req, res) => {
  const id = parseInt(req.query.id, 10);
  const updateData = req.body;

  const result = await CategoryService.updateCategoryByIdAsync(id, updateData);

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category updated successfully", 1);
  } else {
    res.sendCommonValue({}, "Failed to update category", 0);
  }
};

// Update categories by name
const updateCategoryByNameAsync = async (req, res) => {
  const { name } = req.query;
  const updateData = req.body;

  const result = await CategoryService.updateCategoryByNameAsync(
    name,
    updateData
  );

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
  updateCategoryByNameAsync,
};
