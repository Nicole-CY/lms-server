const courseInstanceService = require('../../service/course/courseInstanceService');

const addCourseInstanceAsync = async (req, res) => {
    try {
        const courseInstanceData = req.body;
        const result = await courseInstanceService.addCourseInstanceAsync(courseInstanceData);
        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Course instance created successfully', 1, 201);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

const getCourseInstanceByIdAsync = async (req, res) => {
    try {
        const courseInstanceId = req.params.id;
        const result = await courseInstanceService.getCourseInstanceByIdAsync(courseInstanceId);
        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Course instance fetched successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 404);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

const getCourseInstanceListAsync = async (req, res) => {
    try {
        const result = await courseInstanceService.getCourseInstanceListAsync(req.query);
        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Course instances fetched successfully', 1, 200);
        } else {
            res.sendCommonValue([], result.message, 0, 404);
        }
    } catch (err) {
        res.sendCommonValue([], err.message || 'Internal Server Error', 0, 500);
    }
};

const updateCourseInstanceAsync = async (req, res) => {
    try {
        const courseInstanceData = req.body;
        const courseInstanceId = req.body.id;
        const result = await courseInstanceService.updateCourseInstanceAsync(
            courseInstanceData,
            courseInstanceId
        );
        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Course instance updated successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

const deleteCourseInstanceAsync = async (req, res) => {
    try {
        const courseInstanceId = req.params.id;
        const result = await courseInstanceService.deleteCourseInstanceAsync(courseInstanceId);
        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Course instance deleted successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

const bulkDeleteCourseInstancesAsync = async (req, res) => {
    try {
        const ids = req.body.ids;
        const result = await courseInstanceService.bulkDeleteCourseInstancesAsync(ids);
        if (result.isSuccess) {
            res.sendCommonValue({}, 'Course instances deleted successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

module.exports = {
    addCourseInstanceAsync,
    getCourseInstanceByIdAsync,
    getCourseInstanceListAsync,
    updateCourseInstanceAsync,
    deleteCourseInstanceAsync,
    bulkDeleteCourseInstancesAsync,
};
