const CourseOfferingService = require('../../services/course/courseOfferingService');

const getCourseOfferingByIdAsync = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await CourseOfferingService.getCourseOfferingByIdAsync(id);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Course offering found', 1);
        } else {
            res.sendCommonValue({}, 'Course offering not found', 0);
        }
    } catch (error) {
        console.error('Error in getCourseOfferingByIdAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

const getCourseOfferingListAsync = async (req, res) => {
    try {
        const page = parseInt(req.params.page, 10) || 1;
        const pageSize = parseInt(req.params.pageSize, 10) || 10;
        const result = await CourseOfferingService.getCourseOfferingListAsync(page, pageSize);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Course offering list retrieved', 1);
        } else {
            res.sendCommonValue({}, 'No course offerings found', 0);
        }
    } catch (error) {
        console.error('Error in getCourseOfferingListAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

const addCourseOfferingAsync = async (req, res) => {
    try {
        const {
            id,
            course_instance_id,
            teacher_id,
            start_date,
            end_date,
            student_capacity,
            status,
            updated_by,
            created_by,
        } = req.body;

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.sendCommonValue({}, 'Invalid date format', 0);
        }
        const result = await CourseOfferingService.addCourseOfferingAsync({
            id,
            courseInstanceId: course_instance_id,
            teacherId: teacher_id,
            startDate,
            endDate,
            studentCapacity: student_capacity,
            status,
            createdBy: created_by,
            updatedBy: updated_by,
        });

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Course offering added successfully', 1);
        } else {
            res.sendCommonValue({}, result.message || 'Failed to add course offering', 0);
        }
    } catch (error) {
        console.error('Error in addCourseOfferingAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

const deleteCourseOfferingByIdAsync = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CourseOfferingService.deleteCourseOfferingByIdAsync(id);

        if (result.isSuccess) {
            res.sendCommonValue({}, 'Course offering deleted successfully', 1);
        } else {
            res.sendCommonValue({}, 'Course offering not found', 0);
        }
    } catch (error) {
        console.error('Error in deleteCourseOfferingByIdAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

const updateCourseOfferingByIdAsync = async (req, res) => {
    try {
        const id = parseInt(req.body.id, 10);
        if (isNaN(id)) {
            return res.sendCommonValue({}, 'Invalid or missing ID', 0);
        }
        const updateData = {};

        if (req.body.course_instance_id !== undefined)
            updateData.courseInstanceId = req.body.course_instance_id;

        if (req.body.teacher_id !== undefined) updateData.teacherId = req.body.teacher_id;

        if (req.body.start_date !== undefined) {
            const startDate = new Date(req.body.start_date);
            if (isNaN(startDate.getTime())) return res.sendCommonValue({}, 'Invalid start_date', 0);
            updateData.startDate = startDate;
        }

        if (req.body.end_date !== undefined) {
            const endDate = new Date(req.body.end_date);
            if (isNaN(endDate.getTime())) return res.sendCommonValue({}, 'Invalid end_date', 0);
            updateData.endDate = endDate;
        }

        if (req.body.student_capacity !== undefined)
            updateData.studentCapacity = req.body.student_capacity;

        if (req.body.status !== undefined) updateData.status = req.body.status;

        if (req.body.updated_by !== undefined) updateData.updatedBy = req.body.updated_by;

        const result = await CourseOfferingService.updateCourseOfferingByIdAsync(id, updateData);

        if (result.isSuccess) {
            res.sendCommonValue(
                result.data,
                result.message || 'Course offering updated successfully',
                1
            );
        } else {
            res.sendCommonValue({}, result.message || 'Failed to update course offering', 0);
        }
    } catch (error) {
        console.error('Error in updateCourseOfferingByIdAsync:', error);
        res.sendCommonValue({}, 'Internal Server Error', 0);
    }
};

module.exports = {
    getCourseOfferingByIdAsync,
    getCourseOfferingListAsync,
    addCourseOfferingAsync,
    deleteCourseOfferingByIdAsync,
    updateCourseOfferingByIdAsync,
};
