const CourseNotificationService = require("../../service/Course/courseNotificationService");

const getCourseNotificationByIdAsync = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await CourseNotificationService.getCourseNotificationByIdAsync(id);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "Notification found", 1);
        } else {
            res.sendCommonValue({}, "Notification not found", 0);
        }
    } catch (error) {
        console.error("Error in getCourseNotificationByIdAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

const getCourseNotificationListAsync = async (req, res) => {
    try {
        const page = parseInt(req.params.page, 10) || 1;
        const pageSize = parseInt(req.params.pageSize, 10) || 10;

        const result = await CourseNotificationService.getCourseNotificationListAsync(page, pageSize);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "Notification list retrieved", 1);
        } else {
            res.sendCommonValue({}, "No notifications found", 0);
        }
    } catch (error) {
        console.error("Error in getCourseNotificationListAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

const addCourseNotificationAsync = async (req, res) => {
    try {
        const result = await CourseNotificationService.addCourseNotificationAsync(req.body);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "Notification added successfully", 1);
        } else {
            res.sendCommonValue({}, "Failed to add notification", 0);
        }
    } catch (error) {
        console.error("Error in addCourseNotificationAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

const updateCourseNotificationByIdAsync = async (req, res) => {
    try {
        const id = parseInt(req.body.id, 10);
        const result = await CourseNotificationService.updateCourseNotificationByIdAsync(id, req.body);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "Notification updated successfully", 1);
        } else {
            res.sendCommonValue({}, "Failed to update notification", 0);
        }
    } catch (error) {
        console.error("Error in updateCourseNotificationByIdAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

const deleteCourseNotificationByIdAsync = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CourseNotificationService.deleteCourseNotificationByIdAsync(id);

        if (result.isSuccess) {
            res.sendCommonValue({}, "Notification deleted successfully", 1);
        } else {
            res.sendCommonValue({}, "Notification not found", 0);
        }
    } catch (error) {
        console.error("Error in deleteCourseNotificationByIdAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

module.exports = {
    getCourseNotificationByIdAsync,
    getCourseNotificationListAsync,
    addCourseNotificationAsync,
    updateCourseNotificationByIdAsync,
    deleteCourseNotificationByIdAsync,
};
