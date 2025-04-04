const { sequelize } = require("../../db/sequelizedb");
const { getPaginatedResults } = require("../../utils/pagination");
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
const getCategoryListAsync = async (page = 1, pageSize = 10, search = "") => {
  try {
    const where = search ? { categoryName: { [Op.like]: `%${search}%` } } : {};

    const result = await getPaginatedResults(Category, {
      page,
      pageSize,
      where,
    });
    return result;
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
    // 1. Find all child ids
    const findAllChildIds = async (parentIds) => {
      const children = await Category.findAll({
        where: { parentId: parentIds },
        attributes: ['id'],
        raw: true
      });
      if (children.length === 0) return [];
      const childIds = children.map(c => c.id);
      return [...childIds, ...(await findAllChildIds(childIds))];
    };

    // 2. Merge  all ids to be deleted (parent ids and their child ids)
    const childIds = await findAllChildIds(ids);
    const allIdsToDelete = [...new Set([...ids, ...childIds])];

    // 3. Delete all ids
    const deleteCount = await Category.destroy({
      where: { id: allIdsToDelete },
    });

    return {
      isSuccess: deleteCount > 0,
      message: deleteCount > 0 
        ? `Deleted ${deleteCount} categories (including ${childIds.length} children)` 
        : "No matching categories found"
    };

  } catch (error) {
    logger.error("deleteCategoryByIdAsync error:", error);
    return { isSuccess: false, message: "Delete failed" };
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
    const result = await getCategoryByIdAsync(id);
    if (!result.isSuccess) return result;

    const category = await Category.update(updateData, {
      where: {
        id,
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
    // 1. Find current category by name
    const result = await getCategoryByNameAsync(name);
    if (!result.isSuccess) return result;

    // 2. Check if renaming is happening
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

// Get category tree
const getCategoryTreeAsync = async () => {
  try {
    const categories = await Category.findAll();

    const categoryTree = createCategoryTree(categories);

    return { isSuccess: true, message: "", data: categoryTree };
  } catch (error) {
    logger.error("getCategoryByNameAsync error:", error);
    return { isSuccess: false, message: "Server error", data: null };
  }
}

const createCategoryTree = (categories, parentId = null) => {
  const tree = [];

  if (categories.length === 0) return tree;

  categories.filter(
    category => category.parentId === parentId
  ).forEach(category => {
    const children = createCategoryTree(categories, category.id);
    const newCategory = {
      id: category.id,
      label: category.categoryName,
      children: []
    }
    if (children.length) {
      newCategory.children = children;
    }
    tree.push(newCategory);
  })

  return tree;
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
