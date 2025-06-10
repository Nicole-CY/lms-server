const { Op } = require('sequelize');

const { sequelize } = require('../../db/sequelizedb');
const CourseNotification = require('../../models/courseNotification');
const { User, CourseOffering, CourseInstance, Course } = require('../../models');
const { getPaginatedResults } = require('../../utils/pagination');
const logger = require('../../common/logSetting');

// Get course notification by ID
const getCourseNotificationByIdAsync = async id => {
    try {
        const notification = await CourseNotification.findByPk(id);
        if (!notification) {
            return { isSuccess: false, message: 'Notification not found', data: { id: 0 } };
        }
        return { isSuccess: true, message: '', data: notification };
    } catch (error) {
        logger.error('getCourseNotificationByIdAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

// Get course notifications list with pagination
const getCourseNotificationListAsync = async (page = 1, pageSize = 10, search = '') => {
    try {
        const where = {};

        if (search) {
            const userId = parseInt(search, 10);
            if (!isNaN(userId)) {
                where.recipient_id = userId;
            }
        }

        const result = await getPaginatedResults(CourseNotification, {
            page,
            pageSize,
            where,
        });

        return {
            isSuccess: true,
            data: result,
        };
    } catch (error) {
        logger.error('getCourseNotificationListAsync error:', {
            message: error.message,
            stack: error.stack,
        });

        return { isSuccess: false, message: 'Server error', data: null };
    }
};

const getUserOptionsAsync = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
        });

        const options = users.map(user => ({
            id: user.id,
            label: `${user.firstName} ${user.lastName}`,
        }));

        return {
            isSuccess: true,
            data: options,
        };
    } catch (error) {
        logger.error('Error in getUserOptionsAsync:', {
            message: error.message,
            stack: error.stack,
        });
        return {
            isSuccess: false,
            message: 'Failed to fetch users',
        };
    }
};

const getCourseOfferingOptionsAsync = async () => {
    try {
        const offerings = await CourseOffering.findAll({
            include: [
                {
                    model: CourseInstance,
                    include: [
                        {
                            model: Course,
                            attributes: ['title'],
                        },
                    ],
                    attributes: ['id'],
                },
                {
                    model: User,
                    as: 'teacher',
                    attributes: ['firstName', 'lastName'],
                },
            ],
            attributes: ['id', 'startDate', 'endDate'],
            order: [['startDate', 'DESC']],
        });

        const formatDate = date => {
            if (!date) return '';
            return new Date(date).toISOString().split('T')[0];
        };

        const options = offerings.map(offering => {
            const courseTitle = offering.CourseInstance?.Course?.title || 'Untitled Course';
            const teacherName = offering.teacher
                ? `${offering.teacher.firstName} ${offering.teacher.lastName}`
                : 'Unknown Teacher';
            const startDate = formatDate(offering.startDate);
            const endDate = formatDate(offering.endDate);

            return {
                id: offering.id,
                label: `${courseTitle} - ${teacherName} (${startDate} to ${endDate})`,
            };
        });

        return {
            isSuccess: true,
            data: options,
        };
    } catch (error) {
        logger.error('Error in getCourseOfferingOptionsAsync:', {
            message: error.message,
            stack: error.stack,
        });
        return {
            isSuccess: false,
            message: 'Failed to fetch course offerings',
        };
    }
};

// Add new course notification
const addCourseNotificationAsync = async notificationData => {
    try {
        const newNotification = await CourseNotification.create(notificationData);
        return { isSuccess: true, message: 'Notification added', data: newNotification };
    } catch (error) {
        logger.error('addCourseNotificationAsync error:', error);
        return { isSuccess: false, message: 'Add notification failed', data: null };
    }
};

// Update course notification by ID
const updateCourseNotificationByIdAsync = async (id, updateData) => {
    try {
        const result = await getCourseNotificationByIdAsync(id);
        if (!result.isSuccess) return result;

        const cleanedUpdateData = Object.fromEntries(
            Object.entries(updateData).filter(([_, v]) => v !== undefined)
        );

        const [affectedRows] = await CourseNotification.update(cleanedUpdateData, {
            where: { id },
        });

        return {
            isSuccess: true,
            message: affectedRows > 0 ? 'Notification updated successfully' : 'No changes made',
            data: affectedRows,
        };
    } catch (error) {
        logger.error('updateCourseNotificationByIdAsync error:', error);
        return { isSuccess: false, message: 'Update failed', data: null };
    }
};

// Delete course notification(s) by ID(s)
const deleteCourseNotificationByIdAsync = async idsString => {
    const ids = idsString.split(',').map(id => parseInt(id, 10));
    try {
        const deleteCount = await CourseNotification.destroy({
            where: { id: ids },
        });

        if (deleteCount > 0) {
            return { isSuccess: true, message: 'Deleted successfully' };
        }

        return { isSuccess: false, message: 'No matching notifications found' };
    } catch (error) {
        logger.error('deleteCourseNotificationByIdAsync error:', error);
        return { isSuccess: false, message: 'Delete failed', data: null };
    }
};

module.exports = {
    getCourseNotificationByIdAsync,
    getCourseNotificationListAsync,
    addCourseNotificationAsync,
    updateCourseNotificationByIdAsync,
    deleteCourseNotificationByIdAsync,
    getCourseOfferingOptionsAsync,
    getUserOptionsAsync,
};
