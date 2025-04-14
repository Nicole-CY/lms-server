const CourseOffering = require('../../../src/models/courseOffering');
const pagination = require('../../../src/utils/pagination');
const courseOfferingService = require('../../../src/services/Course/courseOfferingService');
const { sequelize } = require('../../../src/db/sequelizedb');

jest.mock('../../../src/models/courseOffering', () => ({
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

jest.mock('../../../src/utils/pagination', () => ({
    getPaginatedResults: jest.fn(),
}));

jest.mock('../../../src/db/sequelizedb', () => ({
    sequelize: {
        authenticate: jest.fn().mockResolvedValue(),
        close: jest.fn().mockResolvedValue(),
    },
}));

describe('CourseOffering Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCourseOfferingByIdAsync', () => {
        it('should return offering when found by id', async () => {
            const mockOffering = { id: 1, courseInstanceId: 2 };
            CourseOffering.findByPk.mockResolvedValue(mockOffering);

            const result = await courseOfferingService.getCourseOfferingByIdAsync(1);

            expect(CourseOffering.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual({ isSuccess: true, message: '', data: mockOffering });
        });

        it('should return error if offering not found', async () => {
            CourseOffering.findByPk.mockResolvedValue(null);

            const result = await courseOfferingService.getCourseOfferingByIdAsync(999);

            expect(result).toEqual({
                isSuccess: false,
                message: 'Course offering not found',
                data: { id: 0 },
            });
        });
    });

    describe('getCourseOfferingListAsync', () => {
        it('should return paginated offerings', async () => {
            const mockResult = { data: [], total: 0 };
            pagination.getPaginatedResults.mockResolvedValue(mockResult);

            const result = await courseOfferingService.getCourseOfferingListAsync(1, 10, '');

            expect(pagination.getPaginatedResults).toHaveBeenCalledWith(CourseOffering, {
                page: 1,
                pageSize: 10,
                where: {},
            });
            expect(result).toEqual(mockResult);
        });
    });

    describe('addCourseOfferingAsync', () => {
        it('should add a new course offering successfully', async () => {
            const offeringData = {
                courseInstanceId: 3,
                startDate: '2024-01-01',
                endDate: '2024-02-01',
            };
            CourseOffering.findOne.mockResolvedValue(null);
            CourseOffering.create.mockResolvedValue({ id: 1, ...offeringData });

            const result = await courseOfferingService.addCourseOfferingAsync(offeringData);

            expect(CourseOffering.create).toHaveBeenCalledWith(offeringData);
            expect(result).toEqual({
                isSuccess: true,
                message: 'Course offering added',
                data: { id: 1, ...offeringData },
            });
        });

        it('should fail if there is a scheduling conflict', async () => {
            const offeringData = {
                courseInstanceId: 3,
                startDate: '2024-01-01',
                endDate: '2024-02-01',
            };
            CourseOffering.findOne.mockResolvedValue({
                id: 2,
                ...offeringData,
                toJSON: () => ({ id: 2, ...offeringData }),
            });

            const result = await courseOfferingService.addCourseOfferingAsync(offeringData);

            expect(result).toEqual({
                isSuccess: false,
                message: 'The course instance has a scheduling conflict within this time period.',
                data: null,
            });
        });
    });

    describe('updateCourseOfferingByIdAsync', () => {
        it('should successfully update a course offering', async () => {
            CourseOffering.findByPk.mockResolvedValue({ id: 1 });
            CourseOffering.findOne.mockResolvedValue(null);
            CourseOffering.update.mockResolvedValue([1]);

            const updateData = {
                startDate: '2024-03-01',
                endDate: '2024-04-01',
                courseInstanceId: 101,
            };
            const result = await courseOfferingService.updateCourseOfferingByIdAsync(1, updateData);

            expect(CourseOffering.update).toHaveBeenCalledWith(updateData, { where: { id: 1 } });
            expect(result).toEqual({
                isSuccess: true,
                message: 'Course offering updated successfully',
                data: 1,
            });
        });
    });

    describe('deleteCourseOfferingByIdAsync', () => {
        it('should successfully delete course offerings by ids', async () => {
            CourseOffering.destroy.mockResolvedValue(2);

            const result = await courseOfferingService.deleteCourseOfferingByIdAsync('1,2');

            expect(CourseOffering.destroy).toHaveBeenCalledWith({ where: { id: [1, 2] } });
            expect(result).toEqual({ isSuccess: true, message: 'Deleted successfully' });
        });

        it('should return failure when no records are deleted', async () => {
            CourseOffering.destroy.mockResolvedValue(0);

            const result = await courseOfferingService.deleteCourseOfferingByIdAsync('3,4');

            expect(result).toEqual({
                isSuccess: false,
                message: 'No matching course offerings found',
            });
        });
    });
});
