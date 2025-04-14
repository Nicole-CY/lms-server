const { Op } = require("sequelize");
const { sequelize } = require("../../db/sequelizedb");
const CourseNotification = require("../../models/courseNotification");
const { getPaginatedResults } = require("../../utils/pagination");
const logger = require("../../common/logSetting");

// Get course notification by ID
const getCourseNotificationByIdAsync = async (id) => {
    try {
        const notification = await CourseNotification.findByPk(id);
        if (!notification) {
            return { isSuccess: false, message: "Notification not found", data: { id: 0 } };
        }
        return { isSuccess: true, message: "", data: notification };
    } catch (error) {
        logger.error("getCourseNotificationByIdAsync error:", error);
        return { isSuccess: false, message: "Server error", data: null };
    }
};

// Get course notifications list with pagination 
const getCourseNotificationListAsync = async (page = 1, pageSize = 10, search = "") => {
    try {
        const where = search
            ? {
                recipient_id: parseInt(search, 10),
            }
            : {};

        const result = await getPaginatedResults(CourseNotification, {
            page,
            pageSize,
            where,
        });

        return result;
    } catch (error) {
        logger.error("getCourseNotificationListAsync error:", error);
        return { isSuccess: false, message: "Server error", data: null };
    }
};

// Add new course notification
const addCourseNotificationAsync = async (notificationData) => {
    try {
        const newNotification = await CourseNotification.create(notificationData);
        return { isSuccess: true, message: "Notification added", data: newNotification };
    } catch (error) {
        logger.error("addCourseNotificationAsync error:", error);
        return { isSuccess: false, message: "Add notification failed", data: null };
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
            message: affectedRows > 0
            ? "Notification updated successfully"
            : "No changes made",            data: affectedRows,
        };
    } catch (error) {
        logger.error("updateCourseNotificationByIdAsync error:", error);
        return { isSuccess: false, message: "Update failed", data: null };
    }
};

// Delete course notification(s) by ID(s)
const deleteCourseNotificationByIdAsync = async (idsString) => {
    const ids = idsString.split(",").map((id) => parseInt(id, 10));
    try {
        const deleteCount = await CourseNotification.destroy({
            where: { id: ids },
        });

        if (deleteCount > 0) {
            return { isSuccess: true, message: "Deleted successfully" };
        }

        return { isSuccess: false, message: "No matching notifications found" };
    } catch (error) {
        logger.error("deleteCourseNotificationByIdAsync error:", error);
        return { isSuccess: false, message: "Delete failed", data: null };
    }
};

module.exports = {
    getCourseNotificationByIdAsync,
    getCourseNotificationListAsync,
    addCourseNotificationAsync,
    updateCourseNotificationByIdAsync,
    deleteCourseNotificationByIdAsync,
};
