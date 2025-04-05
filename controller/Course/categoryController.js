const CategoryService = require("../../service/Course/categoryService");

// Get categories by name
const getCategoryByNameAsync = async (req, res, next) => {
  try {
    const { categoryName } = req.query;
    const result = await CategoryService.getCategoryByNameAsync(categoryName);

    if (result.isSuccess) {
      res.sendCommonValue(result.data, "Category found", 1);
    } else {
      res.sendCommonValue({}, "Category not found", 0);
    }
    
  } catch (error) {
    next(error);
  }
};

// Get categories lists
const getCategoryListAsync = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
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
  const checkCategoryNameResult = await CategoryService.getCategoryByNameAsync(categoryName);

  if (checkCategoryNameResult.isSuccess) {
    return res.sendCommonValue({}, "Category name already exists", 0);
  }

  const addCategoryResult = await CategoryService.addCategoryAsync(req.body);

  if (addCategoryResult.isSuccess) {
    res.sendCommonValue(addCategoryResult.data, "Category added successfully", 1);
  } else {
    res.sendCommonValue({}, "Failed to add category", 0);
  }
};

// Delete categories by id
const deleteCategoryByIdAsync = async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.deleteCategoryByIdAsync(id);

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
  const newCategoryData = req.body;
  const checkCategoryNameResult = await CategoryService.getCategoryByNameAsync(newCategoryData.categoryName);

  if (checkCategoryNameResult.isSuccess) {
    return res.sendCommonValue({}, "Category name already exists", 0);
  }

  const updateCategoryResult = await CategoryService.updateCategoryByIdAsync(id, newCategoryData);

  if (updateCategoryResult.isSuccess) {
    res.sendCommonValue(updateCategoryResult.data, "Category updated successfully", 1);
  } else {
    res.sendCommonValue({}, "Failed to update category", 0);
  }
};

// Update categories by name
const updateCategoryByNameAsync = async (req, res) => {
  const { name } = req.query;
  const newCategoryData = req.body;
  const checkCategoryNameResult = await CategoryService.getCategoryByNameAsync(newCategoryData.categoryName);

  if (checkCategoryNameResult.isSuccess) {
    return res.sendCommonValue({}, "Category name already exists", 0);
  }

  const updateCategoryResult = await CategoryService.updateCategoryByNameAsync(
    name,
    newCategoryData
  );

  if (updateCategoryResult.isSuccess) {
    res.sendCommonValue(updateCategoryResult.data, "Category updated successfully", 1);
  } else {
    res.sendCommonValue({}, "Failed to update category", 0);
  }
};

// Get category tree
const getCategoryTreeAsync = async (req, res) => {
  const result = await CategoryService.getCategoryTreeAsync();

  if (result.isSuccess) {
    res.sendCommonValue(result.data, "Category tree retrieved", 1);
  } else {
    res.sendCommonValue({}, "No categories found", 0);
  }
}

module.exports = {
  getCategoryByNameAsync,
  getCategoryListAsync,
  addCategoryAsync,
  deleteCategoryByIdAsync,
  getCategoryByIdAsync,
  updateCategoryByIdAsync,
  updateCategoryByNameAsync,
  getCategoryTreeAsync
};
