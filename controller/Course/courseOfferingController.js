const CourseOfferingService = require("../../service/Course/courseOfferingService");

const getCourseOfferingByIdAsync = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await CourseOfferingService.getCourseOfferingByIdAsync(id);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "Course offering found", 1);
        } else {
            res.sendCommonValue({}, "Course offering not found", 0);
        }
    } catch (error) {
        console.error("Error in getCourseOfferingByIdAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

const getCourseOfferingListAsync = async (req, res) => {
    try {
        const page = parseInt(req.params.page, 10) || 1;
        const pageSize = parseInt(req.params.pageSize, 10) || 10;
        const result = await CourseOfferingService.getCourseOfferingListAsync(page, pageSize);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "Course offering list retrieved", 1);
        } else {
            res.sendCommonValue({}, "No course offerings found", 0);
        }
    } catch (error) {
        console.error("Error in getCourseOfferingListAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

const addCourseOfferingAsync = async (req, res) => {
    try {
        const { course_instance_id, teacher_id, start_date, student_capacity, status } = req.body;

        const result = await CourseOfferingService.addCourseOfferingAsync(req.body);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "Course offering added successfully", 1);
        } else {
            res.sendCommonValue({}, "Failed to add course offering", 0);
        }
    } catch (error) {
        console.error("Error in addCourseOfferingAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

const deleteCourseOfferingByIdAsync = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CourseOfferingService.deleteCourseOfferingByIdAsync(id);

        if (result.isSuccess) {
            res.sendCommonValue({}, "Course offering deleted successfully", 1);
        } else {
            res.sendCommonValue({}, "Course offering not found", 0);
        }
    } catch (error) {
        console.error("Error in deleteCourseOfferingByIdAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

const updateCourseOfferingByIdAsync = async (req, res) => {
    try {
        const id = parseInt(req.body.id, 10);
        const updateData = req.body;

        const result = await CourseOfferingService.updateCourseOfferingByIdAsync(id, updateData);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, "Course offering updated successfully", 1);
        } else {
            res.sendCommonValue({}, "Failed to update course offering", 0);
        }
    } catch (error) {
        console.error("Error in updateCourseOfferingByIdAsync:", error);
        res.sendCommonValue({}, "Internal Server Error", 0);
    }
};

module.exports = {
    getCourseOfferingByIdAsync,
    getCourseOfferingListAsync,
    addCourseOfferingAsync,
    deleteCourseOfferingByIdAsync,
    updateCourseOfferingByIdAsync,
};
