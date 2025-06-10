const CourseNotificationService = require('../../services/course/courseNotificationService');

const getCourseNotificationByIdAsync = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await CourseNotificationService.getCourseNotificationByIdAsync(id);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Notification found', 1);
        } else {
            res.sendCommonValue({}, 'Notification not found', 0);
        }
    } catch (error) {
        console.error('Error in getCourseNotificationByIdAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

const getCourseNotificationListAsync = async (req, res) => {
    try {
        const page = parseInt(req.params.page, 10) || 1;
        const pageSize = parseInt(req.params.pageSize, 10) || 10;
        const search = req.query.search || '';

        const result = await CourseNotificationService.getCourseNotificationListAsync(
            page,
            pageSize,
            search
        );

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Notification list retrieved', 1);
        } else {
            res.sendCommonValue({}, 'No notifications found', 0);
        }
    } catch (error) {
        console.error('Error in getCourseNotificationListAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

const getNotificationOptionsAsync = async (req, res) => {
    try {
        const [usersRes, courseOfferingsRes] = await Promise.all([
            CourseNotificationService.getUserOptionsAsync(),
            CourseNotificationService.getCourseOfferingOptionsAsync(),
        ]);

        if (!usersRes.isSuccess || !courseOfferingsRes.isSuccess) {
            return res.status(500).json({
                message: 'Failed to fetch options',
                details: {
                    users: usersRes.message,
                    courseOfferings: courseOfferingsRes.message,
                },
            });
        }

        res.json({
            users: usersRes.data,
            courseOfferings: courseOfferingsRes.data,
        });
    } catch (err) {
        logger.error('getNotificationOptionsAsync error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addCourseNotificationAsync = async (req, res) => {
    try {
        const { recipient_id, course_offering_id, message, status } = req.body;

        const notificationData = {
            recipientId: recipient_id,
            courseOfferingId: course_offering_id,
            message,
            status,
        };
        const result = await CourseNotificationService.addCourseNotificationAsync(notificationData);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Notification added successfully', 1);
        } else {
            res.sendCommonValue({}, 'Failed to add notification', 0);
        }
    } catch (error) {
        console.error('Error in addCourseNotificationAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

const updateCourseNotificationByIdAsync = async (req, res) => {
    try {
        const id = parseInt(req.body.id, 10);
        if (isNaN(id)) {
            return res.sendCommonValue({}, 'Invalid or missing ID', 400);
        }

        const updateData = {};

        if (req.body.recipient_id !== undefined) updateData.recipientId = req.body.recipient_id;

        if (req.body.course_offering_id !== undefined)
            updateData.courseOfferingId = req.body.course_offering_id;

        if (req.body.message !== undefined) updateData.message = req.body.message;

        if (req.body.status !== undefined) updateData.status = req.body.status;

        const result = await CourseNotificationService.updateCourseNotificationByIdAsync(
            id,
            updateData
        );

        if (result.isSuccess) {
            res.sendCommonValue(
                result.data,
                result.message || 'Notification updated successfully',
                1
            );
        } else {
            res.sendCommonValue({}, result.message || 'Failed to update notification', 0);
        }
    } catch (error) {
        console.error('Error in updateCourseNotificationByIdAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

const deleteCourseNotificationByIdAsync = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CourseNotificationService.deleteCourseNotificationByIdAsync(id);

        if (result.isSuccess) {
            res.sendCommonValue({}, 'Notification deleted successfully', 1);
        } else {
            res.sendCommonValue({}, 'Notification not found', 0);
        }
    } catch (error) {
        console.error('Error in deleteCourseNotificationByIdAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

module.exports = {
    getCourseNotificationByIdAsync,
    getCourseNotificationListAsync,
    addCourseNotificationAsync,
    updateCourseNotificationByIdAsync,
    deleteCourseNotificationByIdAsync,
    getNotificationOptionsAsync,
};
