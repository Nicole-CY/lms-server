module.exports = {
    verbose: true,
    clearMocks: true,
    resetModules: true,
    transform: {},
    testTimeout: 10000,
    collectCoverage: true,
    collectCoverageFrom: [
        '!**/node_modules/**',
        '!**/tests/**',
        '!**/migrations/**',
        '!**/seeders/**',
        '!**/config/**',
        '!**/index.js',
    ],
    coverageDirectory: 'coverage',
    reporters: ['default'],
    projects: [
        {
            displayName: 'unit',
            testEnvironment: 'node',
            // setupFilesAfterEnv: ['<rootDir>/jest/setupUnitTest.js'],
            testMatch: ['<rootDir>/test/unit/**/*.{test,spec}.js'],
        },
        {
            displayName: 'integration',
            testEnvironment: 'node',
            setupFilesAfterEnv: ['<rootDir>/jest/setupIntegrationTest.js'],
            testMatch: ['<rootDir>/test/integration/**/*.{test,spec}.js'],
        },
    ],
};
