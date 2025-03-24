const { Op } = require("sequelize");
const { sequelize } = require("../../db/sequelizedb");
const CourseOffering = require("../../models/courseOffering");
const { getPaginatedResults } = require("../../utils/pagination");
const logger = require("../../common/logSetting");

// Get offering by ID
const getCourseOfferingByIdAsync = async (id) => {
    try {
        const offering = await CourseOffering.findByPk(id);
        if (!offering) {
            return { isSuccess: false, message: "Course offering not found", data: { id: 0 } };
        }
        return { isSuccess: true, message: "", data: offering };
    } catch (error) {
        logger.error("getCourseOfferingByIdAsync error:", error);
        return { isSuccess: false, message: "Server error", data: null };
    }
};

// Get list of course offerings with pagination
const getCourseOfferingListAsync = async (page = 1, pageSize = 10, search = "") => {
    try {
        const where = search
            ? {
                teacher_id: parseInt(search, 10),
            }
            : {};

        const result = await getPaginatedResults(CourseOffering, {
            page,
            pageSize,
            where,
        });

        return result;
    } catch (error) {
        logger.error("getCourseOfferingListAsync error:", error);
        return { isSuccess: false, message: "Server error", data: null };
    }
};

// Add new course offering
const addCourseOfferingAsync = async (offering) => {
    try {
        const newOffering = await CourseOffering.create(offering);
        return { isSuccess: true, message: "Course offering added", data: newOffering };
    } catch (error) {
        logger.error("addCourseOfferingAsync error:", error);
        return { isSuccess: false, message: "Add failed", data: null };
    }
};

// Update course offering by ID
const updateCourseOfferingByIdAsync = async (id, updateData) => {
    try {
        const result = await getCourseOfferingByIdAsync(id);
        if (!result.isSuccess) return result;

        const updated = await CourseOffering.update(updateData, {
            where: { id },
        });

        return {
            isSuccess: true,
            message: "Course offering updated successfully",
            data: updated,
        };
    } catch (error) {
        logger.error("updateCourseOfferingByIdAsync error:", error);
        return { isSuccess: false, message: "Update failed", data: null };
    }
};

// Delete course offering by ID(s)
const deleteCourseOfferingByIdAsync = async (idsString) => {
    const ids = idsString.split(",").map((id) => parseInt(id, 10));
    try {
        const deleteCount = await CourseOffering.destroy({
            where: { id: ids },
        });

        if (deleteCount > 0) {
            return { isSuccess: true, message: "Deleted successfully" };
        }

        return { isSuccess: false, message: "No matching course offerings found" };
    } catch (error) {
        logger.error("deleteCourseOfferingByIdAsync error:", error);
        return { isSuccess: false, message: "Delete failed", data: null };
    }
};

module.exports = {
    getCourseOfferingByIdAsync,
    getCourseOfferingListAsync,
    addCourseOfferingAsync,
    updateCourseOfferingByIdAsync,
    deleteCourseOfferingByIdAsync,
};
