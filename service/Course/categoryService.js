const { sequelize } = require("../../db/sequelizedb");
const Category = require("../../models/category");
const logger = require("../../common/logsetting");

const getCategoryByNameAsync = async (name) => {
  try {
    const category = await Category.findOne({
      where: { CategoryName: name },
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

const getCategoryListAsync = async (page = 1, pageSize = 10) => {
  const result = {
    isSuccess: true,
    message: "",
    data: {
      items: [],
      total: 0,
    },
  };

  const offset = (page - 1) * pageSize;

  const { count, rows } = await Category.findAndCountAll({
    offset,
    limit: pageSize,
  });

  if (count === 0) return result;

  result.data = {
    items: rows,
    total: count,
  };

  return result;
};

const addCategoryAsync = async (category) => {
  try {
    const newCategory = await Category.create(category);

    return { isSuccess: true, message: "", data: newCategory };
  } catch (error) {
    logger.error("addCategoryAsync error:", error);
    return { isSuccess: false, message: "Add category failed", data: null };
  }
};

const deleteCategoryByIdAsync = async (idsString) => {
  const ids = idsString.split(",").map((id) => parseInt(id));
  const deleteCount = await Category.destroy({
    where: {
      id: ids,
    },
  });

  if (deleteCount > 0) {
    return { isSuccess: true, message: "Deleted successfully" };
  }

  return { isSuccess: false, message: "No matching categories found" };
};

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

module.exports = {
  getCategoryByNameAsync,
  getCategoryListAsync,
  addCategoryAsync,
  deleteCategoryByIdAsync,
  getCategoryByIdAsync,
};
