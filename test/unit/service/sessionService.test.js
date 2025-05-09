jest.mock('../../../models/session', () => ({
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
}));
jest.mock('../../../utils/pagination', () => ({
    getPaginatedResults: jest.fn(),
}));

const Session = require('../../../models/session');
const pagination = require('../../../utils/pagination');
const {
    getSessionByIdAsync,
    getSessionsByCourseInstanceIdAsync,
    addSessionAsync,
    getSessionListAsync,
} = require('../../../service/Course/sessionService');

describe('sessionService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getSessionByIdAsync', () => {
        
    })

})