const { Op } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

/**
 * Filter course instances based on query parameters
 * @param {Object} query - The query parameters
 * @returns {Object} - An object containing where conditions and includes for the query
 */
const courseInstanceFilter = query => {
    const where = {};
    const include = [];

    // Filter by course ID
    if (query.courseId) {
        where.courseId = query.courseId;
    }

    // Filter by launch status
    if (query.launchStatus) {
        where.launchStatus = query.launchStatus;
    }

    // Filter by start date range
    if (query.startDateFrom || query.startDateTo) {
        where.startDate = {};
        if (query.startDateFrom) {
            where.startDate[Op.gte] = new Date(query.startDateFrom);
        }
        if (query.startDateTo) {
            where.startDate[Op.lte] = new Date(query.startDateTo);
        }
    }

    // Filter by end date range
    if (query.endDateFrom || query.endDateTo) {
        where.endDate = {};
        if (query.endDateFrom) {
            where.endDate[Op.gte] = new Date(query.endDateFrom);
        }
        if (query.endDateTo) {
            where.endDate[Op.lte] = new Date(query.endDateTo);
        }
    }

    // Filter by total sessions range
    if (query.minSessions || query.maxSessions) {
        where.totalSessions = {};
        if (query.minSessions) {
            where.totalSessions[Op.gte] = parseInt(query.minSessions);
        }
        if (query.maxSessions) {
            where.totalSessions[Op.lte] = parseInt(query.maxSessions);
        }
    }

    // Filter by course title or code (requires join with Course model)
    if (query.courseTitle || query.courseCode) {
        const courseWhere = {};
        if (query.courseTitle) {
            courseWhere.title = { [Op.like]: `%${query.courseTitle}%` };
        }
        if (query.courseCode) {
            courseWhere.courseCode = { [Op.like]: `%${query.courseCode}%` };
        }

        include.push({
            model: sequelize.models.Course,
            required: true,
            where: courseWhere,
            attributes: ['id', 'title', 'courseCode'],
        });
    } else {
        // If no course filters, still include the Course model for related data
        include.push({
            model: sequelize.models.Course,
            attributes: ['id', 'title', 'courseCode'],
        });
    }

    // Include session counts (optional)
    if (query.includeSessions === 'true') {
        include.push({
            model: sequelize.models.Session,
            attributes: ['id', 'sessionTitle', 'order'],
            required: false,
        });
    }

    return { where, include };
};

module.exports = {
    courseInstanceFilter,
};
