const { sequelize } = require("../../db/sequelizedb");
const Category = require("../../models/category");
const logger = require("../../common/logSetting");

// Get categories by name
const getCategoryByNameAsync = async (name) => {
  try {
    const category = await Category.findOne({
      where: { categoryName: name },
    });

    if (!category) {
      return {
        isSuccess: false,
        message: "Category not found",
        data: { id: 0 },
      };
    }

    return { isSuccess: true, message: "", data: category };
  } catch (error) {
    logger.error("getCategoryByNameAsync error:", error);
    return { isSuccess: false, message: "Server error", data: null };
  }
};

// Get categories lists
const getCategoryListAsync = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;

    const { count, rows } = await Category.findAndCountAll({
      offset,
      limit: pageSize,
    });

    return {
      isSuccess: true,
      message: "",
      data: {
        items: rows,
        total: count,
      },
    };
  } catch (error) {
    logger.error("getCategoryListAsync error:", error);
    return { isSuccess: false, message: "Server error", data: null };
  }
};

// Add categories
const addCategoryAsync = async (category) => {
  try {
    const newCategory = await Category.create(category);

    return { isSuccess: true, message: "Category added", data: newCategory };
  } catch (error) {
    logger.error("addCategoryAsync error:", error);
    return { isSuccess: false, message: "Add category failed", data: null };
  }
};

// Delete categories by id
const deleteCategoryByIdAsync = async (idsString) => {
  const ids = idsString.split(",").map((id) => parseInt(id, 10));

  try {
    const deleteCount = await Category.destroy({
      where: { id: ids },
    });

    if (deleteCount > 0) {
      return { isSuccess: true, message: "Deleted successfully" };
    }

    return { isSuccess: false, message: "No matching categories found" };
  } catch (error) {
    logger.error("deleteCategoryByIdAsync error:", error);
    return { isSuccess: false, message: "Delete failed", data: null };
  }
};

// Get categories by id
const getCategoryByIdAsync = async (id) => {
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return {
        isSuccess: false,
        message: "category not found",
        data: { id: 0 },
      };
    }

    return { isSuccess: true, message: "", data: category };
  } catch (error) {
    logger.error("getCategoryByIdAsync error:", error);
    return { isSuccess: false, message: "Get category failed", data: null };
  }
};

// Update categories by id
const updateCategoryByIdAsync = async (id, updateData) => {
  try {
    const result = await console.log(result);
    if (!result.isSuccess) return result;

    const category = await Category.update(updateData, {
      where: {
        id: updateData.id,
      },
    });

    return {
      isSuccess: true,
      message: "Category updated successfully",
      data: category,
    };
  } catch (error) {
    logger.error("updateCategoryByIdAsync error:", error);
    return { isSuccess: false, message: "Server error", data: null };
  }
};

// Update categories by name
const updateCategoryByNameAsync = async (name, updateData) => {
  try {
    //1. Find current category by name
    const result = await getCategoryByNameAsync(name);
    if (!result.isSuccess) return result;

    //2. Check if renaming is happening
    if (updateData.categoryName && updateData.categoryName !== name) {
      const existingResult = await getCategoryByNameAsync(updateData.name);
      const isExisting = existingResult.isSuccess;

      if (isExisting) {
        return {
          isSuccess: false,
          message: "The new category name already exists",
          data: null,
        };
      }
    }

    // 3. Proceed with update
    await Category.update(updateData, {
      where: {
        categoryName: name,
      },
    });

    return {
      isSuccess: true,
      message: "Category updated successfully",
      data: updateData,
    };
  } catch (error) {
    logger.error("updateCategoryByNameAsync error:", error);
    return { isSuccess: false, message: "Server error", data: null };
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
