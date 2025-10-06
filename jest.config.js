module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/tests/**/*.test.js',
        '**/src/**/*.test.js',
        '**/src/**/*.spec.js'
    ],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testTimeout: 30000,
    collectCoverageFrom: [
        'src/**/*.js',
        'eCommerce-Backend/src/**/*.js',
        '!src/**/*.test.js',
        '!src/**/*.spec.js',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!**/dist/**',
        '!**/build/**'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    verbose: true,
    detectOpenHandles: true,
    forceExit: true,
    clearMocks: true,
    restoreMocks: true,
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/build/',
        '/coverage/'
    ],
    moduleDirectories: [
        'node_modules',
        'src',
        'eCommerce-Backend/src'
    ],
    testResultsProcessor: 'jest-sonar-reporter'
};
