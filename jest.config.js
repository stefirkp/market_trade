module.exports = {
  collectCoverageFrom: [
    '{pages,components,lib}/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: [
    'lib/test-utils.tsx',
    'lib/mocks/*',
    'pages/_app.page.tsx',
    'pages/index.page.tsx',
  ],
  coverageReporters: ['lcov', 'html', 'text'],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/lib/mocks/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/lib/mocks/fileMock.js',

    // Handle @lib & @components aliases
    '^@assets(.*)$': '<rootDir>/assets$1',
    '^@components(.*)$': '<rootDir>/components$1',
    '^@context(.*)$': '<rootDir>/context$1',
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],
  globalSetup: '<rootDir>/jestGlobalSetup.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
