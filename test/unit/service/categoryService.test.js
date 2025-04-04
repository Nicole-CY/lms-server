jest.mock('../../../models/category', () => ({
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
}));
jest.mock('../../../utils/pagination', () => ({
    getPaginatedResults: jest.fn(),
}));

const Permission = require('../../../models/category');
const pagination = require('../../../utils/pagination');
const permissionService = require('../../../service/Course/categoryService');

describe('categoryService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getCategoryListAsync', () => {
        it('should return paginated results', async () => {
            const mockResult = { data: [], total: 0 };
            pagination.getPaginatedResults.mockResolvedValue(mockResult);

            const result = await categoryService.getCategoryListAsync(1, 10, '');

            expect(pagination.getPaginatedResults).toHaveBeenCalled();
            expect(result).toEqual(mockResult);
        });

        it('should handle error', async () => {
            pagination.getPaginatedResults.mockRejectedValue(new Error('DB Error'));

            const result = await categoryService.getCategoryListAsync();

            expect(result.isSuccess).toBe(false);
            expect(result.message).toBe('Get category list failed');
        });
    });
});