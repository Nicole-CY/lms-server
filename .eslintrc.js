module.exports = {
    env: {
        node: true,
        es2023: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
    },
    plugins: ['prettier', 'import', 'jest'],
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:jest/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': 'error',
        eqeqeq: ['error', 'always'],
        'no-shadow': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-arrow-callback': 'error',
        'arrow-spacing': ['error', { before: true, after: true }],
        'object-curly-spacing': ['error', 'always'],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ],
        'import/no-cycle': 'error',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-conditional-expect': 'error',
    },
    overrides: [
        {
            files: ['**/*.test.js', '**/*.spec.js'],
            rules: {
                'no-console': 'off',
                'jest/no-mocks-import': 'warn',
                'jest/consistent-test-it': ['warn', { fn: 'it', withinDescribe: 'it' }],
            },
        },
    ],
};
