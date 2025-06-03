const { Op } = require('sequelize');

// const CourseCategory =require("../models/courseCategory");
const { CourseCategory } = require('../models');

/**
 * Build filtering options for courses.
 * @param {Object} query - The query object (e.g., req.query) containing filter parameters.
 * Supported parameters:
 *   - title: Partial course title (case-insensitive)
 *   - courseCode: Partial course code (case-insensitive)
 *   - categories: An array of category IDs
 * @returns {Object} An object with:
 *   - where: A Sequelize "where" clause for filtering Course fields.
 *   - include: An array for the "include" option to filter by associated categories.
 */
function courseFilter(query) {
    const where = {};
    const include = [];
    // Filter by title if provided (partial match, case-insensitive)
    if (query.search) {
        where[Op.or] = [
            { title: { [Op.like]: `%${query.search}%` } },
            { courseCode: { [Op.like]: `%${query.search}%` } },
        ];
    }

    // Filter by categories if provided as an array
    if (query.categories && Array.isArray(query.categories) && query.categories.length > 0) {
        // Convert category IDs to numbers
        // const categoryIds = query.categories.map((str)=> parseInt(str, 10));
        // const categoryIds = query.categories.map(str => +str);
        // const categoryIds = query.categories.map(str => Number(str));
        const categoryIds = query.categories.map(Number);
        include.push({
            model: CourseCategory,
            where: { categoryId: { [Op.in]: categoryIds } },
            required: true, // course not have matching category will be excluded
            attributes: [], // CourseCategory used solely for filtering and is not included in the output.
        });
    }

    return { where, include };
}
module.exports = { courseFilter };
