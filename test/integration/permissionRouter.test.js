const request = require('supertest');
const jwt = require('jsonwebtoken');

const { jwtConfig } = require('../../appConfig');
const app = require('../../app');
const { sequelize } = require('../../db/sequelizedb');
const Permission = require('../../models/permission');

let token;

beforeAll(async () => {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const user = {
        id: 1,
        role: ['superadmin'],
        email: 'superadmin@example.com',
    };

    token = jwt.sign(user, jwtConfig.secret, {
        expiresIn: `${jwtConfig.expiresIn}s`,
    });
});

afterAll(async () => {
    await sequelize.close();
});

beforeEach(async () => {
    await Permission.destroy({ where: {} });
});

describe('Permission API Integration Tests', () => {
    it('POST /api/permissions - Create permission', async () => {
        const res = await request(app)
            .post('/api/permissions')
            .set('Cookie', [`token=${token}`])
            .send({
                name: 'VIEW_USER',
                description: 'View user information',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toBe('VIEW_USER');
    });

    it('GET /api/permissions - Get paginated permission list', async () => {
        await Permission.create({ name: 'EDIT_USER', description: 'Edit user data' });

        const res = await request(app)
            .get('/api/permissions?page=1&pageSize=10')
            .set('Cookie', [`token=${token}`]);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.items.length).toBeGreaterThan(0);
        expect(res.body.data.total).toBeDefined();
    });

    it('GET /api/permissions/getPermissionById - Get permission by ID', async () => {
        const permission = await Permission.create({
            name: 'DELETE_USER',
            description: 'Delete user',
        });

        const res = await request(app)
            .get(`/api/permissions/getPermissionById?id=${permission.id}`)
            .set('Cookie', [`token=${token}`]);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toBe('DELETE_USER');
    });

    it('PUT /api/permissions - Update permission', async () => {
        const permission = await Permission.create({
            name: 'UPDATE_USER',
            description: 'Update user',
        });

        const res = await request(app)
            .put('/api/permissions')
            .set('Cookie', [`token=${token}`])
            .send({
                id: permission.id,
                name: 'UPDATE_USER_MODIFIED',
                description: 'Updated description',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('success');

        const updated = await Permission.findByPk(permission.id);
        expect(updated.name).toBe('UPDATE_USER_MODIFIED');
    });
});
