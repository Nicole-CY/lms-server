// const Course = require("../../models/course");
// const CourseCategory = require("../../models/courseCategory");
const { Course, CourseCategory } = require('../../models');
const logger = require('../../common/logSetting');
const { getPagination } = require('../../common/pagination');
const { courseFilter } = require('../../filters/courseFilter');
const { sequelize, Sequelize } = require('../../db/sequelizedb');
const { Op } = Sequelize;

const addCourseAsync = async courseData => {
    const t = await sequelize.transaction();
    try {
        // check if courseCode exists
        const existingCourse = await Course.findOne({
            where: { courseCode: courseData.courseCode },
            transaction: t,
        });

        if (existingCourse) {
            await t.rollback();
            return {
                isSuccess: false,
                message: `Course with code "${courseData.courseCode}" already exists`,
                data: null,
            };
        }

        // check if title exists
        const existingTitle = await Course.findOne({
            where: { title: courseData.title },
            transaction: t,
        });

        if (existingTitle) {
            await t.rollback();
            return {
                isSuccess: false,
                message: `Course with title "${courseData.title}" already exists`,
                data: null,
            };
        }

        // create new course
        const newCourse = await Course.create(
            {
                title: courseData.title,
                courseCode: courseData.courseCode,
                coverImage: courseData.coverImage,
                description: courseData.description,
                createdBy: courseData.createdBy,
                updatedBy: courseData.updatedBy,
            },
            { transaction: t }
        );

        // create course and category association
        if (
            courseData.categories &&
            Array.isArray(courseData.categories) &&
            courseData.categories.length > 0
        ) {
            const courseCategories = courseData.categories.map(categoryId => ({
                courseId: newCourse.id,
                categoryId,
            }));
            await CourseCategory.bulkCreate(courseCategories, { transaction: t });
        }

        await t.commit();

        // get course and its associated categories
        const courseWithCategories = await Course.findByPk(newCourse.id, {
            include: [
                {
                    model: CourseCategory,
                    attributes: ['categoryId'],
                    required: false,
                },
            ],
        });

        return {
            isSuccess: true,
            message: '',
            data: courseWithCategories,
        };
    } catch (err) {
        await t.rollback();
        logger.error('addCourseAsync error:', err);
        return { isSuccess: false, message: 'Add course failed', data: null };
    }
};

const getCourseByTitleAsync = async title => {
    try {
        const course = await Course.findOne({
            where: { title },
            include: [
                {
                    model: CourseCategory,
                    attributes: ['categoryId'],
                    required: false,
                },
            ],
        });
        if (!course) {
            return { isSuccess: false, message: 'course not found', data: null };
        }
        return { isSuccess: true, message: '', data: course };
    } catch (err) {
        logger.error('getCourseAsync error:', err);
        return { isSuccess: false, message: 'failed to fetch course by title', data: null };
    }
};

const getCourseByCourseCodeAsync = async code => {
    try {
        const course = await Course.findOne({
            where: { courseCode: code },
            include: [
                {
                    model: CourseCategory,
                    attributes: ['categoryId'],
                    required: false,
                },
            ],
        });
        if (!course) {
            return { isSuccess: false, message: 'course not found', data: null };
        }
        return { isSuccess: true, message: '', data: course };
    } catch (err) {
        logger.error('getCourseByCourseCodeAsync error:', err);
        return { isSuccess: false, message: 'failed to fetch course by courseCode', data: null };
    }
};

const getCourseByIdAsync = async id => {
    try {
        const course = await Course.findByPk(id, {
            include: [
                {
                    model: CourseCategory,
                    attributes: ['categoryId'],
                    required: false,
                },
            ],
        });
        if (!course) {
            return { isSuccess: false, message: 'course not found', data: null };
        }
        return { isSuccess: true, message: '', data: course };
    } catch (err) {
        logger.error('getCourseByIdAsync error:', err);
        return { isSuccess: false, message: 'failed to fetch course by id', data: null };
    }
};

const getCourseListAsync = async query => {
    try {
        const { page, pageSize, offset, limit } = getPagination(query);
        const { where, include } = courseFilter(query);
        const { count, rows: courses } = await Course.findAndCountAll({
            where,
            include,
            limit,
            offset,
            order: [['id', 'ASC']],
        });
        return {
            isSuccess: true,
            message: '',
            data: {
                courses,
                total: count,
                page,
                pageSize,
            },
        };
    } catch (err) {
        logger.error('getCourseListAsync error:', err);
        return { isSuccess: false, message: 'Failed to get course list', data: null };
    }
};

// using transaction for atomicity
const updateCourseAsync = async (courseData, courseId) => {
    const t = await sequelize.transaction();
    try {
        const course = await Course.findByPk(courseId, { transaction: t });
        if (!course) {
            await t.rollback();
            return { isSuccess: false, message: 'course not found', data: null };
        }

        // check if courseCode exists
        const existingCourse = await Course.findOne({
            where: {
                courseCode: courseData.courseCode,
                id: {
                    [Op.ne]: courseId, // exclude current course
                },
            },
            transaction: t,
        });

        if (existingCourse) {
            await t.rollback();
            return {
                isSuccess: false,
                message: `Course with code "${courseData.courseCode}" already exists`,
                data: null,
            };
        }

        // check if title exists
        const existingTitle = await Course.findOne({
            where: {
                title: courseData.title,
                id: {
                    [Op.ne]: courseId, // exclude current course
                },
            },
            transaction: t,
        });

        if (existingTitle) {
            await t.rollback();
            return {
                isSuccess: false,
                message: `Course with title "${courseData.title}" already exists`,
                data: null,
            };
        }

        course.title = courseData.title;
        course.courseCode = courseData.courseCode;
        course.coverImage = courseData.coverImage;
        course.description = courseData.description;
        await course.save({ transaction: t });
        if (
            courseData.categories &&
            Array.isArray(courseData.categories) &&
            courseData.categories.length > 0
        ) {
            await CourseCategory.destroy({
                where: {
                    courseId,
                },
                transaction: t,
            });
            const courseCategories = courseData.categories.map(categoryId => ({
                courseId: courseId,
                categoryId: Number(categoryId),
            }));
            await CourseCategory.bulkCreate(courseCategories, { transaction: t });
        }
        await t.commit();
        // Re-fetch the course with its associated categories (not part of the transaction)
        const courseWithCategories = await Course.findByPk(courseId, {
            include: [
                {
                    model: CourseCategory,
                    attributes: ['categoryId'],
                    required: false,
                },
            ],
        });
        return { isSuccess: true, message: '', data: courseWithCategories };
    } catch (err) {
        await t.rollback();
        logger.error('updateCourseAsync error:', err);
        return { isSuccess: false, message: 'Failed to update course', data: null };
    }
};

const deleteCourseAsync = async id => {
    const t = await sequelize.transaction();
    try {
        const course = await Course.findByPk(id, { transaction: t });
        if (!course) {
            await t.rollback();
            return { isSuccess: false, message: 'course not found', data: null };
        }
        // no need if onDelete: CASCADE configured in model
        //     await CourseCategory.destroy({
        //         where: {courseId: id},
        //         transaction: t,
        // });
        await course.destroy({ transaction: t });
        await t.commit();
        return { isSuccess: true, message: '', data: course };
    } catch (err) {
        await t.rollback();
        logger.error('deleteCourseAsync error:', err);
        return { isSuccess: false, message: 'Failed to delete course', data: null };
    }
};

const bulkDeleteCoursesAsync = async ids => {
    const t = await sequelize.transaction();
    try {
        // no need if onDelete: CASCADE configured in model
        // await CourseCategory.destroy({
        //     where: {courseId: ids},
        //     transaction: t,
        // });
        const deletedCount = await Course.destroy({
            where: { id: ids },
            transaction: t,
        });
        if (deletedCount === 0) {
            await t.rollback();
            return { isSuccess: false, message: 'No courses found to delete', data: null };
        }
        await t.commit();
        return { isSuccess: true, message: 'courses deleted successfully', data: null };
    } catch (err) {
        await t.rollback();
        logger.error('bulkDeleteCoursesAsync error:', err);
        return { isSuccess: false, message: 'Failed to bulk delete courses', data: null };
    }
};

module.exports = {
    addCourseAsync,
    getCourseByTitleAsync,
    getCourseByCourseCodeAsync,
    getCourseByIdAsync,
    getCourseListAsync,
    updateCourseAsync,
    deleteCourseAsync,
    bulkDeleteCoursesAsync,
};
