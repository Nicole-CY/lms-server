const { Op } = require('sequelize');

const courseService = require('../../../src/services/Course/courseService');
const { Course, CourseCategory } = require('../../../src/models');
const { sequelize } = require('../../../src/db/sequelizedb');
const { courseFilter } = require('../../../src/filters/courseFilter');
const { getPagination } = require('../../../src/common/pagination');

// mock the required dependencies
jest.mock('../../../src/models', () => {
    const mockCourse = {
        findOne: jest.fn(),
        findByPk: jest.fn(),
        findAndCountAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
    };
    const mockCourseCategory = {
        bulkCreate: jest.fn(),
        destroy: jest.fn(),
    };
    return {
        Course: mockCourse,
        CourseCategory: mockCourseCategory,
    };
});

jest.mock('../../../src/db/sequelizedb', () => ({
    sequelize: {
        transaction: jest.fn(() => ({
            commit: jest.fn(),
            rollback: jest.fn(),
        })),
    },
}));

jest.mock('../../../src/common/logSetting', () => ({
    error: jest.fn(),
}));

jest.mock('../../../src/filters/courseFilter', () => ({
    courseFilter: jest.fn(),
}));

jest.mock('../../../src/common/pagination', () => ({
    getPagination: jest.fn(),
}));

describe('Course Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addCourseAsync', () => {
        it('should successfully add a course with categories', async () => {
            // arrange
            const courseData = {
                title: 'Test Course',
                courseCode: 'TEST101',
                coverImage: 'test.jpg',
                description: 'Test Description',
                categories: [1, 2],
                createdBy: 1,
                updatedBy: 1,
            };
            Course.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
            const mockNewCourse = { id: 1, ...courseData };
            Course.create.mockResolvedValueOnce(mockNewCourse);
            CourseCategory.bulkCreate.mockResolvedValueOnce([]);

            const mockCourseWithCategories = {
                ...mockNewCourse,
                CourseCategory: [{ categoryId: 1 }, { categoryId: 2 }],
            };
            Course.findByPk.mockResolvedValueOnce(mockCourseWithCategories);

            // act
            const result = await courseService.addCourseAsync(courseData);

            // assert
            expect(result.isSuccess).toBe(true);
            expect(result.data).toEqual(mockCourseWithCategories);
            expect(Course.findOne).toHaveBeenCalledTimes(2);
            expect(Course.create).toHaveBeenCalledTimes(1);
            expect(CourseCategory.bulkCreate).toHaveBeenCalledTimes(1);
            expect(Course.findByPk).toHaveBeenCalledTimes(1);
        });

        it('should return error when course code already exists', async () => {
            // arrange
            const courseData = {
                title: 'Test Course',
                courseCode: '101',
            };
            Course.findOne.mockResolvedValueOnce({ id: 1, courseCode: '101' });
            // act
            const result = await courseService.addCourseAsync(courseData);
            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toContain('already exists');
            expect(Course.create).not.toHaveBeenCalled();
        });

        it('should return error when course title already exists', async () => {
            // arrange
            const courseData = {
                title: 'Test Course',
                courseCode: 'TEST101',
            };
            Course.findOne
                .mockResolvedValueOnce(null)
                .mockResolvedValueOnce({ id: 1, title: 'Test Course' });
            // act
            const result = await courseService.addCourseAsync(courseData);
            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toContain('already exists');
            expect(Course.create).not.toHaveBeenCalled();
        });

        it('should handle database errors gracefully', async () => {
            // arrange
            const courseData = {
                title: 'Test Course',
                courseCode: 'TEST101',
            };
            Course.findOne.mockRejectedValueOnce(new Error('Database error'));

            // act
            const result = await courseService.addCourseAsync(courseData);
            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toBe('Add course failed');
        });
    });

    describe('getCourseByTitleAsync', () => {
        it('should return course when title exists', async () => {
            // arrange
            const courseData = {
                id: 1,
                title: 'Test Course',
                CourseCategories: [{ categoryId: 1 }],
            };
            Course.findOne.mockResolvedValueOnce(courseData);

            // act
            const result = await courseService.getCourseByTitleAsync('Test Course');

            // assert
            expect(result.isSuccess).toBe(true);
            expect(result.data).toEqual(courseData);
            expect(Course.findOne).toHaveBeenCalledTimes(1);
        });

        it('should return null when course title does not exist', async () => {
            // arrange
            Course.findOne.mockResolvedValueOnce(null);

            // act
            const result = await courseService.getCourseByTitleAsync('Non-existent Course');

            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toContain('not found');
            expect(Course.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('getCourseByCodeAsync', () => {
        it('should return course when code exists', async () => {
            // arrange
            const courseData = {
                id: 1,
                courseCode: 'TEST101',
                CourseCategories: [{ categoryId: 1 }],
            };
            Course.findOne.mockResolvedValueOnce(courseData);

            // act
            const result = await courseService.getCourseByCourseCodeAsync('TEST101');

            // assert
            expect(result.isSuccess).toBe(true);
            expect(result.data).toEqual(courseData);
            expect(Course.findOne).toHaveBeenCalledTimes(1);
        });

        it('should return null when course code does not exist', async () => {
            // arrange
            Course.findOne.mockResolvedValueOnce(null);

            // act
            const result = await courseService.getCourseByCourseCodeAsync('NONEXISTENT');

            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toContain('not found');
            expect(Course.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('getCourseByIdAsync', () => {
        it('should return course when id exists', async () => {
            // arrange
            const courseData = {
                id: 1,
                title: 'Test Course',
                courseCode: 'TEST101',
                CourseCategories: [{ categoryId: 1 }],
            };
            Course.findByPk.mockResolvedValueOnce(courseData);

            // act
            const result = await courseService.getCourseByIdAsync(1);

            // assert
            expect(result.isSuccess).toBe(true);
            expect(result.data).toEqual(courseData);
            expect(Course.findByPk).toHaveBeenCalledTimes(1);
        });

        it('should return null when course id does not exist', async () => {
            // arrange
            Course.findByPk.mockResolvedValueOnce(null);

            // act
            const result = await courseService.getCourseByIdAsync(999);

            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toContain('not found');
            expect(Course.findByPk).toHaveBeenCalledTimes(1);
        });
    });

    describe('getCourseListAsync', () => {
        it('should return list of courses with pagination', async () => {
            // arrange
            const courses = [
                { id: 1, title: 'Course 1' },
                { id: 2, title: 'Course 2' },
            ];
            const query = { page: '1', pageSize: '10', title: 'Course' };
            getPagination.mockReturnValueOnce({
                page: 1,
                pageSize: 10,
                offset: 0,
                limit: 10,
            });
            courseFilter.mockReturnValueOnce({
                where: { title: { [Op.like]: '%Test%' } },
                include: [],
            });
            Course.findAndCountAll.mockResolvedValueOnce({
                rows: courses,
                count: 2,
            });

            // act
            const result = await courseService.getCourseListAsync(query);

            // assert
            expect(result.isSuccess).toBe(true);
            expect(result.data.courses).toEqual(courses);
            expect(result.data.total).toEqual(2);
            expect(getPagination).toHaveBeenCalledWith(query);
            expect(courseFilter).toHaveBeenCalledWith(query);
            expect(Course.findAndCountAll).toHaveBeenCalledWith({
                where: { title: { [Op.like]: '%Test%' } },
                include: [],
                limit: 10,
                offset: 0,
                order: [['id', 'ASC']],
            });
        });
        it('should handle database errors in course list retrieval', async () => {
            // arrange
            Course.findAndCountAll.mockRejectedValueOnce(new Error('Database error'));

            // act
            const result = await courseService.getCourseListAsync({});

            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toBe('Failed to get course list');
        });
    });

    describe('updateCourseAsync', () => {
        it('should successfully update a course with categories', async () => {
            // arrange
            const updatedCourse = {
                title: 'Updated Course',
                courseCode: 'TEST101',
                categories: [1, 2],
            };
            const originalCourse = {
                id: 1,
                title: 'Original Course',
                courseCode: 'ORG101',
                categories: [3, 4],
                save: jest.fn(),
            };

            Course.findByPk.mockResolvedValueOnce(originalCourse);
            CourseCategory.destroy.mockResolvedValueOnce(true);
            CourseCategory.bulkCreate.mockResolvedValueOnce([]);

            const mockUpdatedCourseWithCategories = {
                ...originalCourse,
                ...updatedCourse,
                CourseCategories: [{ categoryId: 1 }, { categoryId: 2 }],
            };
            Course.findByPk.mockResolvedValueOnce(mockUpdatedCourseWithCategories);

            // act
            const result = await courseService.updateCourseAsync(updatedCourse, 1);

            // assert
            expect(result.isSuccess).toBe(true);
            expect(result.data).toBe(mockUpdatedCourseWithCategories);
            expect(originalCourse.save).toHaveBeenCalledTimes(1);
            expect(CourseCategory.destroy).toHaveBeenCalledTimes(1);
            expect(CourseCategory.bulkCreate).toHaveBeenCalledTimes(1);
            expect(Course.findByPk).toHaveBeenCalledTimes(2);
        });

        it('should return error when course id does not exist', async () => {
            // arrange
            Course.findByPk.mockResolvedValueOnce(null);

            // act
            const result = await courseService.updateCourseAsync({}, 1);

            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toContain('not found');
            expect(Course.findByPk).toHaveBeenCalledTimes(1);
        });
    });

    describe('deleteCourseAsync', () => {
        it('should successfully delete a course', async () => {
            // arrange
            const mockCourse = {
                id: 1,
                title: 'Test Course',
                courseCode: 'TEST101',
                CourseCategories: [{ categoryId: 1 }, { categoryId: 2 }],
                destroy: jest.fn(),
            };
            Course.findByPk.mockResolvedValueOnce(mockCourse);

            // act
            const result = await courseService.deleteCourseAsync(1);

            // assert
            expect(result.isSuccess).toBe(true);
            expect(mockCourse.destroy).toHaveBeenCalledTimes(1);
            expect(Course.findByPk).toHaveBeenCalledTimes(1);
        });

        it('should return error when course id does not exist', async () => {
            // arrange
            Course.findByPk.mockResolvedValueOnce(null);

            // act
            const result = await courseService.deleteCourseAsync(1);

            // assert
            expect(result.isSuccess).toBe(false);
            expect(result.message).toBe('course not found');
            expect(Course.findByPk).toHaveBeenCalledTimes(1);
        });
    });

    describe('bulkDeleteCourseAsync', () => {
        it('should successfully delete multiple courses', async () => {
            // arrange
            Course.destroy.mockResolvedValueOnce(2);
            // act
            const result = await courseService.bulkDeleteCoursesAsync([1, 2]);

            // assert
            expect(result.isSuccess).toBe(true);
            expect(Course.destroy).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { id: [1, 2] },
                })
            );
        });
        it('should return error when course ids do not exist', async () => {
            // arrange
            Course.destroy.mockRejectedValueOnce(0);
            // act
            const result = await courseService.bulkDeleteCoursesAsync([1, 2]);

            // assert
            expect(result.isSuccess).toBe(false);
        });
    });
});
