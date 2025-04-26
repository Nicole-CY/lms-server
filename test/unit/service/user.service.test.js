const userService = require('../../service/userService');
const User = require('../../models/user');
jest.mock('../../models/user');

describe('User Service Unit Tests', () => {
    describe('addUserAsync', () => {
        it('should create user successfully', async () => {
            User.create.mockResolvedValueOnce({});
            const user = {
                firstName: 'JJJ',
                lastName: 'KKK',
                email: 'JJJ@KKK.com',
                password: 'pass123',
            };

            const result = await userService.addUserAsync(user);
            expect(result.isSuccess).toBe(true);
        });

        it('should handle create user failure', async () => {
            User.create.mockRejectedValueOnce(new Error('DB error'));
            const result = await userService.addUserAsync({});
            expect(result.isSuccess).toBe(false);
        });
    });

    describe('getUserByIdAsync', () => {
        it('should return user if found', async () => {
            User.findByPk.mockResolvedValueOnce({ id: 1, firstName: 'JJJ' });
            const result = await userService.getUserByIdAsync(1);
            expect(result.isSuccess).toBe(true);
            expect(result.data).toHaveProperty('id');
        });

        it('should return not found if no user', async () => {
            User.findByPk.mockResolvedValueOnce(null);
            const result = await userService.getUserByIdAsync(99);
            expect(result.isSuccess).toBe(false);
        });
    });

    describe('deleteUserByIdAsync', () => {
        it('should delete user successfully', async () => {
            User.destroy.mockResolvedValueOnce(1);
            const result = await userService.deleteUserByIdAsync('1,2');
            expect(result.isSuccess).toBe(true);
        });

        it('should fail if user not found', async () => {
            User.destroy.mockResolvedValueOnce(0);
            const result = await userService.deleteUserByIdAsync('999');
            expect(result.isSuccess).toBe(false);
        });
    });
});
