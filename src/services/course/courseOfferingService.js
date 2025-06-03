const { Op } = require('sequelize');

const { sequelize } = require('../../db/sequelizedb');
const CourseOffering = require('../../models/courseOffering');
const { CourseInstance, Course, User, UserRole } = require('../../models');
const { getPaginatedResults } = require('../../utils/pagination');
const logger = require('../../common/logSetting');

// Get offering by ID
const getCourseOfferingByIdAsync = async id => {
    try {
        const offering = await CourseOffering.findByPk(id);
        if (!offering) {
            return { isSuccess: false, message: 'Course offering not found', data: { id: 0 } };
        }
        return { isSuccess: true, message: '', data: offering };
    } catch (error) {
        logger.error('getCourseOfferingByIdAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

const getCourseOfferingListAsync = async (page = 1, pageSize = 10, search = '') => {
    try {
        const where = {
            [Op.or]: [],
        };

        const include = [
            {
                model: User,
                as: 'teacher',
                attributes: ['firstName', 'lastName'],
                required: false,
            },
            {
                model: CourseInstance,
                attributes: ['id'],
                required: false,
                include: [
                    {
                        model: Course,
                        attributes: ['title'],
                        required: false,
                    },
                ],
            },
        ];

        if (search) {
            where[Op.or].push(
                { '$teacher.first_name$': { [Op.like]: `%${search}%` } },
                { '$teacher.last_name$': { [Op.like]: `%${search}%` } },
                { '$CourseInstance.Course.title$': { [Op.like]: `%${search}%` } },
                { status: { [Op.like]: `%${search}%` } },
                { student_capacity: { [Op.like]: `%${search}%` } }
            );

            const parsedDate = Date.parse(search);
            if (!isNaN(parsedDate)) {
                where[Op.or].push(
                    { start_date: { [Op.eq]: new Date(parsedDate) } },
                    { end_date: { [Op.eq]: new Date(parsedDate) } }
                );
            }
        } else {
            delete where[Op.or];
        }

        const result = await getPaginatedResults(CourseOffering, {
            page,
            pageSize,
            where,
            include,
        });

        const finalRows = (result.data.items || []).map(item => {
            const json = item.toJSON();
            return {
                ...json,
                courseTitle: json.CourseInstance?.Course?.title || '',
                teacherFullName:
                    `${json.teacher?.firstName || ''} ${json.teacher?.lastName || ''}`.trim(),
            };
        });

        return {
            isSuccess: true,
            message: 'Success',
            data: {
                items: finalRows,
                total: result.data.total,
                totalPages: result.data.totalPages,
                currentPage: result.data.currentPage,
                perPage: result.data.perPage,
            },
        };
    } catch (error) {
        logger.error('getCourseOfferingListAsync error:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

const getTeacherOptionsAsync = async () => {
    try {
        if (!User.associations.userRoles) {
            throw new Error('UserRole is not associated with User. Check model definitions.');
        }

        const teachers = await User.findAll({
            include: [
                {
                    model: UserRole,
                    as: 'userRoles',
                    where: { roleId: 3 },
                    attributes: [],
                    required: true,
                },
            ],
            attributes: ['id', 'firstName', 'lastName'],
            limit: 100,
        });

        if (!teachers || teachers.length === 0) {
            console.warn('No teachers found with roleId=3. Check database records.');
        }

        const options = teachers.map(teacher => ({
            id: teacher.id,
            label: `${teacher.firstName} ${teacher.lastName}`,
        }));

        return {
            isSuccess: true,
            data: options,
        };
    } catch (error) {
        logger.error('Error in getTeacherOptionsAsync:', {
            message: error.message,
            stack: error.stack,
            sequelizeError: error.original,
        });
        return {
            isSuccess: false,
            message: 'Failed to fetch teachers',
            debug: process.env.NODE_ENV === 'development' ? error.message : undefined,
        };
    }
};

const getCourseInstanceOptionsAsync = async () => {
    try {
        const courseInstances = await CourseInstance.findAll({
            include: [
                {
                    model: Course,
                    attributes: ['title'],
                },
            ],
            attributes: ['id', 'courseId', 'startDate', 'endDate'],
            order: [['startDate', 'DESC']],
        });

        const options = courseInstances.map(instance => {
            const formatDate = iso => new Date(iso).toISOString().split('T')[0];
            const title = instance.Course?.title || `Course #${instance.courseId}`;

            return {
                id: instance.id,
                label: `${title} (${formatDate(instance.startDate)} to ${formatDate(instance.endDate)})`,
            };
        });

        return {
            isSuccess: true,
            data: options,
        };
    } catch (error) {
        logger.error('Error in getCourseInstanceOptionsAsync:', error);
        return {
            isSuccess: false,
            message: 'Failed to fetch course instances',
        };
    }
};

const isCourseOfferingConflict = async (courseInstanceId, startDate, endDate, excludeId = null) => {
    const whereClause = {
        courseInstanceId,
        [Op.or]: [
            {
                startDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
            {
                endDate: {
                    [Op.between]: [startDate, endDate],
                },
            },
            {
                startDate: {
                    [Op.lte]: startDate,
                },
                endDate: {
                    [Op.gte]: endDate,
                },
            },
        ],
    };

    if (excludeId) {
        whereClause.id = { [Op.ne]: excludeId };
    }

    const existingOffering = await CourseOffering.findOne({
        where: whereClause,
    });

    if (existingOffering) {
        console.log('🔥 Conflict detected with existing course offering:');
        console.log(existingOffering.toJSON());
    } else {
        console.log('✅ No conflict detected');
    }

    return existingOffering !== null;
};

// Add new course offering
const addCourseOfferingAsync = async offering => {
    try {
        const { id, courseInstanceId, startDate, endDate } = offering;
        const hasConflict = await isCourseOfferingConflict(
            courseInstanceId,
            startDate,
            endDate,
            id
        );

        if (hasConflict) {
            return {
                isSuccess: false,
                message: 'The course instance has a scheduling conflict within this time period.',
                data: null,
            };
        }

        const newOffering = await CourseOffering.create(offering);
        return { isSuccess: true, message: 'Course offering added', data: newOffering };
    } catch (error) {
        logger.error('addCourseOfferingAsync error:', error);
        return { isSuccess: false, message: 'Add failed', data: null };
    }
};

// Update course offering by ID
const updateCourseOfferingByIdAsync = async (id, updateData) => {
    try {
        const result = await getCourseOfferingByIdAsync(id);
        if (!result.isSuccess) return result;

        if (updateData.startDate && updateData.endDate && updateData.courseInstanceId) {
            const hasConflict = await isCourseOfferingConflict(
                updateData.courseInstanceId,
                updateData.startDate,
                updateData.endDate,
                id
            );

            if (hasConflict) {
                return {
                    isSuccess: false,
                    message: 'Course offering time conflicts with another course',
                    data: null,
                };
            }
        }

        const cleanedUpdateData = Object.fromEntries(
            Object.entries(updateData).filter(([_, v]) => v !== undefined)
        );

        const [affectedRows] = await CourseOffering.update(cleanedUpdateData, {
            where: { id },
        });

        return {
            isSuccess: true,
            message: affectedRows > 0 ? 'Course offering updated successfully' : 'No changes made',
            data: affectedRows,
        };
    } catch (error) {
        logger.error('updateCourseOfferingByIdAsync error:', error);
        return { isSuccess: false, message: 'Update failed', data: null };
    }
};

// Delete course offering by ID(s)
const deleteCourseOfferingByIdAsync = async idsString => {
    const ids = idsString.split(',').map(id => parseInt(id, 10));
    try {
        const deleteCount = await CourseOffering.destroy({
            where: { id: ids },
        });

        if (deleteCount > 0) {
            return { isSuccess: true, message: 'Deleted successfully' };
        }

        return { isSuccess: false, message: 'No matching course offerings found' };
    } catch (error) {
        logger.error('deleteCourseOfferingByIdAsync error:', error);
        return { isSuccess: false, message: 'Delete failed', data: null };
    }
};

module.exports = {
    getCourseOfferingByIdAsync,
    getCourseOfferingListAsync,
    addCourseOfferingAsync,
    updateCourseOfferingByIdAsync,
    deleteCourseOfferingByIdAsync,
    getCourseInstanceOptionsAsync,
    getTeacherOptionsAsync,
};
