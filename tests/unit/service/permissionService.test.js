jest.mock('../../../src/models/permission', () => ({
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
}));
jest.mock('../../../src/utils/pagination', () => ({
    getPaginatedResults: jest.fn(),
}));

const Permission = require('../../../src/models/permission');
const pagination = require('../../../src/utils/pagination');
const permissionService = require('../../../src/services/permissionService');

describe('permissionService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getPermissionListAsync', () => {
        it('should return paginated results', async () => {
            const mockResult = { data: [], total: 0 };
            pagination.getPaginatedResults.mockResolvedValue(mockResult);

            const result = await permissionService.getPermissionListAsync(1, 10, '');

            expect(pagination.getPaginatedResults).toHaveBeenCalled();
            expect(result).toEqual(mockResult);
        });

        it('should handle error', async () => {
            pagination.getPaginatedResults.mockRejectedValue(new Error('DB Error'));

            await expect(permissionService.getPermissionListAsync()).rejects.toThrow('DB Error');
        });
    });

    describe('getPermissionByIdAsync', () => {
        it('should return permission if found', async () => {
            const mockPermission = { id: 1, name: 'READ' };
            Permission.findByPk.mockResolvedValue(mockPermission);

            const result = await permissionService.getPermissionByIdAsync(1);

            expect(result.isSuccess).toBe(true);
            expect(result.data).toEqual(mockPermission);
        });

        it('should return not found if no permission', async () => {
            Permission.findByPk.mockResolvedValue(null);

            const result = await permissionService.getPermissionByIdAsync(999);

            expect(result.isSuccess).toBe(false);
            expect(result.message).toMatch(/not found/i);
        });
    });

    describe('addPermissionAsync', () => {
        it('should create permission and return it', async () => {
            const input = { name: 'CREATE', description: 'can create' };
            const mockCreated = { id: 1, ...input };
            Permission.create.mockResolvedValue(mockCreated);

            const result = await permissionService.addPermissionAsync(input);

            expect(Permission.create).toHaveBeenCalledWith(input);
            expect(result.isSuccess).toBe(true);
            expect(result.data).toEqual(mockCreated);
        });

        it('should handle create error', async () => {
            Permission.create.mockRejectedValue(new Error('create failed'));

            const result = await permissionService.addPermissionAsync({ name: 'fail' });

            expect(result.isSuccess).toBe(false);
            expect(result.message).toMatch(/add permission failed/i);
        });
    });

    describe('uptPermissionByIdAsync', () => {
        it('should update permission and return success', async () => {
            Permission.update.mockResolvedValue([1]);

            const result = await permissionService.uptPermissionByIdAsync({
                id: 1,
                name: 'EDIT',
                description: 'can edit',
            });

            expect(result.isSuccess).toBe(true);
        });

        it('should return failure if nothing updated', async () => {
            Permission.update.mockResolvedValue([0]);

            const result = await permissionService.uptPermissionByIdAsync({
                id: 2,
                name: 'EDIT',
                description: 'desc',
            });

            expect(result.isSuccess).toBe(false);
        });
    });

    describe('checkPermissionNameAsync', () => {
        it('should detect duplicate name', async () => {
            Permission.findOne.mockResolvedValue({ id: 2 });

            const result = await permissionService.checkPermissionNameAsync('DUPLICATE', 1);

            expect(result.isSuccess).toBe(false);
            expect(result.message).toMatch(/already exists/i);
        });

        it('should return success if name not taken or same id', async () => {
            Permission.findOne.mockResolvedValue({ id: 1 });

            const result = await permissionService.checkPermissionNameAsync('SAME', 1);

            expect(result.isSuccess).toBe(true);
        });

        it('should return success if name not found', async () => {
            Permission.findOne.mockResolvedValue(null);

            const result = await permissionService.checkPermissionNameAsync('UNIQUE', 999);

            expect(result.isSuccess).toBe(true);
        });
    });
});
