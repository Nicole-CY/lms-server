jest.mock('../../../models/category', () => ({
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
}));
jest.mock('../../../utils/pagination', () => ({
    getPaginatedResults: jest.fn(),
}));

const Category = require('../../../models/category');
const pagination = require('../../../utils/pagination');
const {
    getCategoryByNameAsync,
    getCategoryListAsync,
    addCategoryAsync,
} = require('../../../service/Course/categoryService');

describe('categoryService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // test suite for getCategoryByNameAsync function
    describe('getCategoryByNameAsync', () => {
        it('should return category when found by name', async () => {
            const mockCategory = {
                id: 1,
                categoryName: 'Programming',
            };

            Category.findOne.mockResolvedValue(mockCategory);

            const result = await getCategoryByNameAsync('Programming');

            expect(Category.findOne).toHaveBeenCalledWith({
                where: { categoryName: 'Programming' },
            });
            expect(result).toEqual({
                isSuccess: true,
                message: '',
                data: mockCategory,
            });
        });

        it('should return not found when category does not exist', async () => {
            Category.findOne.mockResolvedValue(null);

            const result = await getCategoryByNameAsync('NonExisting');

            expect(Category.findOne).toHaveBeenCalledWith({
                where: { categoryName: 'NonExisting' },
            });
            expect(result).toEqual({
                isSuccess: false,
                message: 'Category not found',
                data: { id: 0 },
            });
        });
    });

    // test suite for getCategoryListAsync function
    describe('getCategoryListAsync', () => {
        it('should return paginated results', async () => {
            const mockResult = { data: [], total: 0 };
            pagination.getPaginatedResults.mockResolvedValue(mockResult);

            const result = await getCategoryListAsync(1, 10, '');

            expect(pagination.getPaginatedResults).toHaveBeenCalled();
            expect(result).toEqual(mockResult);
        });

        it('should handle error', async () => {
            pagination.getPaginatedResults.mockRejectedValue(new Error('DB Error'));

            await expect(getCategoryListAsync()).resolves.toEqual({
                isSuccess: false,
                data: null,
                message: 'Server error',
            });
        });
    });

    // test suite for addCategoryAsync function
    describe('addCategoryAsync', () => {
        it('should successfully add a new category', async () => {
            const mockCategoryData = {
                categoryName: 'Art',
                description: 'All art related courses',
            };

            const mockCreatedCategory = {
                id: 21,
                ...mockCategoryData,
            };

            Category.create.mockResolvedValue(mockCreatedCategory);

            const result = await addCategoryAsync(mockCategoryData);

            expect(Category.create).toHaveBeenCalledWith(mockCategoryData);
            expect(result).toEqual({
                isSuccess: true,
                message: 'Category added',
                data: mockCreatedCategory,
            });
        });

        it('should handle database errors', async () => {
            const mockError = new Error('Database error');
            Category.create.mockRejectedValue(mockError);

            const result = await addCategoryAsync({ categoryName: 'Test' });

            expect(result).toEqual({
                isSuccess: false,
                message: 'Add category failed',
                data: null,
            });
        });
    });
});
