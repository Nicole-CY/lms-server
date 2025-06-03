const { Op } = require('sequelize'); // 直接从sequelize包导入Op

const { CourseInstance, Course, Session } = require('../../models');
const logger = require('../../common/logSetting');
const { getPagination } = require('../../common/pagination');
const { courseInstanceFilter } = require('../../filters/courseInstanceFilter');
const { sequelize } = require('../../db/sequelizedb');

const addCourseInstanceAsync = async courseInstanceData => {
    const t = await sequelize.transaction();
    try {
        // Check if course exists
        const course = await Course.findByPk(courseInstanceData.courseId);
        if (!course) {
            await t.rollback();
            return { isSuccess: false, message: 'Course not found', data: null };
        }

        // Check for overlapping dates with other instances of the same course
        const existingInstances = await CourseInstance.findAll({
            where: {
                courseId: courseInstanceData.courseId,
                [Op.or]: [
                    {
                        startDate: {
                            [Op.between]: [
                                courseInstanceData.startDate,
                                courseInstanceData.endDate,
                            ],
                        },
                    },
                    {
                        endDate: {
                            [Op.between]: [
                                courseInstanceData.startDate,
                                courseInstanceData.endDate,
                            ],
                        },
                    },
                ],
            },
        });

        if (existingInstances.length > 0) {
            await t.rollback();
            return {
                isSuccess: false,
                message: 'Date range overlaps with existing course instance',
                data: null,
            };
        }

        const newCourseInstance = await CourseInstance.create(
            {
                courseId: courseInstanceData.courseId,
                startDate: courseInstanceData.startDate,
                endDate: courseInstanceData.endDate,
                totalSessions: courseInstanceData.totalSessions,
                launchStatus: courseInstanceData.launchStatus || 'Scheduled',
                createdBy: courseInstanceData.createdBy,
                updatedBy: courseInstanceData.updatedBy,
            },
            { transaction: t }
        );

        await t.commit();

        // Fetch the created instance with its associations
        const courseInstanceWithAssociations = await CourseInstance.findByPk(newCourseInstance.id, {
            include: [
                {
                    model: Course,
                    attributes: ['title', 'courseCode'],
                },
            ],
        });

        return {
            isSuccess: true,
            message: '',
            data: courseInstanceWithAssociations,
        };
    } catch (err) {
        await t.rollback();
        logger.error('addCourseInstanceAsync error:', err);
        return { isSuccess: false, message: 'Failed to create course instance', data: null };
    }
};
// const addCourseInstanceAsync = async courseInstanceData => {
//     // 1. 先查询课程是否存在（不需要事务）
//     const course = await Course.findByPk(courseInstanceData.courseId);
//     if (!course) {
//         return { isSuccess: false, message: 'Course not found', data: null };
//     }

//     // 2. 现在开启事务（准备读写操作）
//     const t = await sequelize.transaction();
//     try {
//         // 3. 查询是否有时间重叠的课程实例，并加 FOR UPDATE 锁（防并发）
//         const [existingInstances] = await sequelize.query(
//             `SELECT * FROM CourseInstances
//              WHERE courseId = ?
//              AND (
//                  (startDate BETWEEN ? AND ?) OR
//                  (endDate BETWEEN ? AND ?)
//              )
//              FOR UPDATE`,
//             {
//                 replacements: [
//                     courseInstanceData.courseId,
//                     courseInstanceData.startDate,
//                     courseInstanceData.endDate,
//                     courseInstanceData.startDate,
//                     courseInstanceData.endDate,
//                 ],
//                 transaction: t,
//             }
//         );

//         if (existingInstances.length > 0) {
//             await t.rollback();
//             return {
//                 isSuccess: false,
//                 message: 'Date range overlaps with existing course instance',
//                 data: null,
//             };
//         }

//         // 4. 创建课程实例（事务内执行）
//         const newCourseInstance = await CourseInstance.create(
//             {
//                 courseId: courseInstanceData.courseId,
//                 startDate: courseInstanceData.startDate,
//                 endDate: courseInstanceData.endDate,
//                 totalSessions: courseInstanceData.totalSessions,
//                 launchStatus: courseInstanceData.launchStatus || 'Scheduled',
//                 createdBy: courseInstanceData.createdBy,
//                 updatedBy: courseInstanceData.updatedBy,
//             },
//             { transaction: t }
//         );

//         await t.commit();

//         // 5. 查询带关联数据（可以不在事务里查）
//         const courseInstanceWithAssociations = await CourseInstance.findByPk(
//             newCourseInstance.id,
//             {
//                 include: [
//                     {
//                         model: Course,
//                         attributes: ['title', 'courseCode'],
//                     },
//                 ],
//             }
//         );

//         return {
//             isSuccess: true,
//             message: '',
//             data: courseInstanceWithAssociations,
//         };
//     } catch (err) {
//         await t.rollback();
//         logger.error('addCourseInstanceAsync error:', err);
//         return { isSuccess: false, message: 'Failed to create course instance', data: null };
//     }
// };

const getCourseInstanceByIdAsync = async id => {
    try {
        const courseInstance = await CourseInstance.findByPk(id, {
            include: [
                {
                    model: Course,
                    attributes: ['title', 'courseCode'],
                },
                {
                    model: Session,
                    attributes: ['id', 'sessionTitle', 'order', 'sessionDescription'],
                },
            ],
        });

        if (!courseInstance) {
            return { isSuccess: false, message: 'Course instance not found', data: null };
        }

        return { isSuccess: true, message: '', data: courseInstance };
    } catch (err) {
        logger.error('getCourseInstanceByIdAsync error:', err);
        return { isSuccess: false, message: 'Failed to fetch course instance', data: null };
    }
};

const getCourseInstanceListAsync = async query => {
    try {
        const { page, pageSize, offset, limit } = getPagination(query);

        // Use the courseInstanceFilter to get where conditions and includes
        const { where, include } = courseInstanceFilter(query);

        const { count, rows: courseInstances } = await CourseInstance.findAndCountAll({
            where,
            include,
            limit,
            offset,
            order: [['startDate', 'DESC']],
            distinct: true, // Important for accurate count when using includes
        });

        // If requested, include session counts for each course instance
        if (query.includeSessionCounts === 'true') {
            for (const instance of courseInstances) {
                const sessionCount = await Session.count({
                    where: { courseInstanceId: instance.id },
                });
                instance.dataValues.sessionCount = sessionCount;
            }
        }

        return {
            isSuccess: true,
            message: '',
            data: {
                courseInstances,
                total: count,
                page,
                pageSize,
            },
        };
    } catch (err) {
        logger.error('getCourseInstanceListAsync error:', err);
        return { isSuccess: false, message: 'Failed to get course instance list', data: null };
    }
};

const updateCourseInstanceAsync = async (courseInstanceData, courseInstanceId) => {
    const t = await sequelize.transaction();
    try {
        const courseInstance = await CourseInstance.findByPk(courseInstanceId, { transaction: t });
        if (!courseInstance) {
            await t.rollback();
            return { isSuccess: false, message: 'Course instance not found', data: null };
        }

        // Check for overlapping dates if dates are being updated
        if (courseInstanceData.startDate || courseInstanceData.endDate) {
            const existingInstances = await CourseInstance.findAll({
                where: {
                    courseId: courseInstance.courseId,
                    id: { [Op.ne]: courseInstanceId },
                    [Op.or]: [
                        {
                            startDate: {
                                [Op.between]: [
                                    courseInstanceData.startDate || courseInstance.startDate,
                                    courseInstanceData.endDate || courseInstance.endDate,
                                ],
                            },
                        },
                        {
                            endDate: {
                                [Op.between]: [
                                    courseInstanceData.startDate || courseInstance.startDate,
                                    courseInstanceData.endDate || courseInstance.endDate,
                                ],
                            },
                        },
                    ],
                },
                transaction: t,
            });

            if (existingInstances.length > 0) {
                await t.rollback();
                return {
                    isSuccess: false,
                    message: 'Date range overlaps with existing course instance',
                    data: null,
                };
            }
        }

        // Update the course instance
        await courseInstance.update(
            {
                startDate: courseInstanceData.startDate,
                endDate: courseInstanceData.endDate,
                totalSessions: courseInstanceData.totalSessions,
                launchStatus: courseInstanceData.launchStatus,
                updatedBy: courseInstanceData.updatedBy,
            },
            { transaction: t }
        );

        await t.commit();

        // Fetch the updated instance with its associations
        const updatedInstance = await CourseInstance.findByPk(courseInstanceId, {
            include: [
                {
                    model: Course,
                    attributes: ['title', 'courseCode'],
                },
            ],
        });

        return {
            isSuccess: true,
            message: '',
            data: updatedInstance,
        };
    } catch (err) {
        await t.rollback();
        logger.error('updateCourseInstanceAsync error:', err);
        return { isSuccess: false, message: 'Failed to update course instance', data: null };
    }
};

const deleteCourseInstanceAsync = async id => {
    const t = await sequelize.transaction();
    try {
        const courseInstance = await CourseInstance.findByPk(id, { transaction: t });
        if (!courseInstance) {
            await t.rollback();
            return { isSuccess: false, message: 'Course instance not found', data: null };
        }

        // delete all sessions of the course instance
        const deletedSessionsCount = await Session.destroy({
            where: { courseInstanceId: id },
            transaction: t,
        });

        // delete the course instance itself
        await courseInstance.destroy({ transaction: t });
        await t.commit();

        return {
            isSuccess: true,
            message: `Course instance and ${deletedSessionsCount} related sessions deleted successfully`,
            data: courseInstance,
        };
    } catch (err) {
        await t.rollback();
        logger.error('deleteCourseInstanceAsync error:', err);
        return { isSuccess: false, message: 'Failed to delete course instance', data: null };
    }
};

const bulkDeleteCourseInstancesAsync = async ids => {
    const t = await sequelize.transaction();
    try {
        // delete all sessions of the course instances
        const deletedSessionsCount = await Session.destroy({
            where: { courseInstanceId: ids },
            transaction: t,
        });

        // delete the course instances themselves
        const deletedCount = await CourseInstance.destroy({
            where: { id: ids },
            transaction: t,
        });

        if (deletedCount === 0) {
            await t.rollback();
            return { isSuccess: false, message: 'No course instances found to delete', data: null };
        }

        await t.commit();
        return {
            isSuccess: true,
            message: `${deletedCount} course instances and ${deletedSessionsCount} related sessions deleted successfully`,
            data: { deletedInstancesCount: deletedCount, deletedSessionsCount },
        };
    } catch (err) {
        await t.rollback();
        logger.error('bulkDeleteCourseInstancesAsync error:', err);
        return { isSuccess: false, message: 'Failed to bulk delete course instances', data: null };
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
