const request = require('supertest');

const app = require('../../../app');
const { Course, CourseCategory, Category } = require('../../../models');
const { generateToken } = require('../../utils/auth');

let token;
let testCourse;
let testCategory;

beforeAll(async () => {
    token = generateToken();
    testCourse = await Course.create({
        title: 'Test Course',
        description: 'Test Description',
        courseCode: 'TEST101',
        coverImage: 'test.jpg',
    });
    testCategory = await Category.create({
        categoryName: 'Test Category',
        description: 'Category for testing',
        iconUrl: 'test-icon.png',
    });

    // Associate course with category
    await CourseCategory.create({
        courseId: testCourse.id,
        categoryId: testCategory.id,
    });
});

describe('Course Router Integration Test', () => {
    describe('POST /api/courses', () => {
        it('should create a new course', async () => {
            const newCourse = {
                title: 'New Test Course',
                courseCode: 'NEW101',
                coverImage: 'new.jpg',
                description: 'New course for testing',
                categories: [testCategory.id],
            };
            const response = await request(app)
                .post('/api/courses')
                .set('cookie', [`token=${token}`])
                .send(newCourse)
                .expect(201);

            expect(response.statusCode).toBe(201);
            expect(response.body.data.title).toBe(newCourse.title);
            expect(response.body.data.courseCode).toBe(newCourse.courseCode);

            // Clean up: delete the created course
            await Course.destroy({ where: { id: response.body.data.id } });
        });

        it('should return 400 when course with same title already exists', async () => {
            const duplicateCourse = {
                title: testCourse.title, // using existing course title
                courseCode: 'UNIQUE101',
            };
            const response = await request(app)
                .post('/api/courses')
                .set('cookie', [`token=${token}`])
                .send(duplicateCourse)
                .expect(400);

            // expect(response.statusCode).toBe(400);
            expect(response.body.message).toContain('already exists');
        });

        it('should return 400 when required fields are missing', async () => {
            const invalidCourse = {
                // Missing required fields
                description: 'Invalid course',
            };

            await request(app)
                .post('/api/courses')
                .set('Cookie', [`token=${token}`])
                .send(invalidCourse)
                .expect(400);
        });
    });

    describe('GET /api/courses/getByTitle', () => {
        it('should get a course by title', async () => {
            const response = await request(app)
                .get(`/api/courses/getByTitle?title=${encodeURIComponent(testCourse.title)}`) // encodeURIComponent to handle special characters like empty spaces. /, ?, &, etc., turn space into %20,  /api/courses/getByTitle?title=Test%20Course
                .set('Cookie', [`token=${token}`])
                .expect(200);

            expect(response.body.data.id).toBe(testCourse.id);
            expect(response.body.data.title).toBe(testCourse.title);
        });
        it('should return 404 when course not found by title', async () => {
            const response = await request(app)
                .get('/api/courses/getByTitle?title=NonexistentCourse')
                .set('Cookie', [`token=${token}`])
                .expect(404);
            expect(response.body.message).toContain('not found');
        });
    });
    describe('GET /api/courses/getByCode', () => {
        it('should get a course by course code', async () => {
            const response = await request(app)
                .get(`/api/courses/getByCode?courseCode=${testCourse.courseCode}`)
                .set('Cookie', [`token=${token}`])
                .expect(200);
            expect(response.body.data.id).toBe(testCourse.id);
            expect(response.body.data.courseCode).toBe(testCourse.courseCode);
        });

        it('should return 404 when course not found by code', async () => {
            const response = await request(app)
                .get('/api/courses/getByCode?courseCode=NONEXISTENT')
                .set('Cookie', [`token=${token}`])
                .expect(404);
            expect(response.body.message).toContain('not found');
        });
    });

    describe('GET /api/courses/getById', () => {
        it('should get a course by id', async () => {
            const response = await request(app)
                .get(`/api/courses/getById?id=${testCourse.id}`)
                .set('Cookie', [`token=${token}`])
                .expect(200);
            expect(response.body.data.id).toBe(testCourse.id);
            expect(response.body.data.title).toBe(testCourse.title);
        });

        it('should return 404 when course not found by id', async () => {
            const response = await request(app)
                .get('/api/courses/getById?id=9999')
                .set('Cookie', [`token=${token}`])
                .expect(404);
            expect(response.body.message).toContain('not found');
        });
    });

    describe('GET /api/courses', () => {
        it('should get a paginated list of courses', async () => {
            const response = await request(app)
                .get('/api/courses?page=1&pageSize=10')
                .set('Cookie', [`token=${token}`])
                .expect(200);
            expect(response.body.data.courses).toBeInstanceOf(Array);
            expect(response.body.data.page).toBe(1);
            expect(response.body.data.pageSize).toBe(10);
            expect(response.body.data.total).toBeGreaterThanOrEqual(1);
        });

        it('should filter courses by title', async () => {
            const response = await request(app)
                .get(`/api/courses?title=${encodeURIComponent(testCourse.title)}`)
                .set('Cookie', [`token=${token}`])
                .expect(200);
            expect(response.body.data.courses.some(course => course.id === testCourse.id)).toBe(
                true
            );
        });

        it('should filter courses by courseCode', async () => {
            const response = await request(app)
                .get(`/api/courses?courseCode=${testCourse.courseCode}`)
                .set('Cookie', [`token=${token}`])
                .expect(200);
            expect(response.body.data.courses.some(course => course.id === testCourse.id)).toBe(
                true
            );
        });

        it('should filter courses by category', async () => {
            const response = await request(app)
                .get(`/api/courses/?category[]=${testCategory.id}`)

                .set('Cookie', [`token=${token}`])
                .expect(200);

            expect(response.body.data.courses.some(course => course.id === testCourse.id)).toBe(
                true
            );
        });
    });
    describe('PUT /api/courses', () => {
        it('should update a course', async () => {
            // First create a course to update
            const courseToUpdate = await Course.create({
                title: 'Course To Update',
                courseCode: 'UPDATE101',
                description: 'Will be updated',
            });

            const updateData = {
                id: courseToUpdate.id,
                title: 'Updated Course Title',
                courseCode: 'UPDATED101',
                description: 'This course has been updated',
                categories: [testCategory.id],
            };

            const response = await request(app)
                .put('/api/courses')
                .set('Cookie', [`token=${token}`])
                .send(updateData)
                .expect(200);
            expect(response.body.data.id).toBe(courseToUpdate.id);
            expect(response.body.data.title).toBe(updateData.title);
            expect(response.body.data.courseCode).toBe(updateData.courseCode);
            expect(response.body.data.description).toBe(updateData.description);

            // Clean up
            await Course.destroy({ where: { id: courseToUpdate.id } });
        });

        it('should return 400 when course to update not found', async () => {
            const updateData = {
                id: 9999,
                title: 'Nonexistent Course',
                courseCode: 'NONEXIST101',
            };

            const response = await request(app)
                .put('/api/courses')
                .set('Cookie', [`token=${token}`])
                .send(updateData)
                .expect(400);
            expect(response.body.message).toContain('not found');
        });
    });

    describe('DELETE /api/courses/:id', () => {
        it('should delete a course by id', async () => {
            // First create a course to delete
            const courseToDelete = await Course.create({
                title: 'Course To Delete',
                courseCode: 'DELETE101',
                description: 'Will be deleted',
            });

            const response = await request(app)
                .delete(`/api/courses/${courseToDelete.id}`)
                .set('Cookie', [`token=${token}`])
                .expect(200);
            expect(response.body.data.id).toBe(courseToDelete.id);

            // Verify course is deleted
            const deletedCourse = await Course.findByPk(courseToDelete.id);
            expect(deletedCourse).toBeNull();
        });

        it('should return 400 when course to delete not found', async () => {
            const response = await request(app)
                .delete('/api/courses/9999')
                .set('Cookie', [`token=${token}`])
                .expect(400);

            expect(response.body.message).toContain('not found');
        });
    });

    describe('DELETE /api/courses/bulk', () => {
        it('should delete multiple courses', async () => {
            // Create multiple courses to delete
            const course1 = await Course.create({
                title: 'Bulk Delete Course 1',
                courseCode: 'BULK101',
                description: 'Will be bulk deleted',
            });

            const course2 = await Course.create({
                title: 'Bulk Delete Course 2',
                courseCode: 'BULK102',
                description: 'Will be bulk deleted',
            });

            const response = await request(app)
                .delete('/api/courses/bulk')
                .set('Cookie', [`token=${token}`])
                .send({ ids: [course1.id, course2.id] })
                .expect(200);

            // Verify courses are deleted
            const deletedCourse1 = await Course.findByPk(course1.id);
            const deletedCourse2 = await Course.findByPk(course2.id);
            expect(deletedCourse1).toBeNull();
            expect(deletedCourse2).toBeNull();
        });

        it('should return 400 when no courses found to delete', async () => {
            const response = await request(app)
                .delete('/api/courses/bulk')
                .set('Cookie', [`token=${token}`])
                .send({ ids: [9999, 10000] })
                .expect(400);

            expect(response.body.message).toContain('No courses found to delete');
        });
    });
});
