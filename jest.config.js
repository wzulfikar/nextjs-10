/**
 * See jest documentation for more info: https://jestjs.io/docs/configuration
 */
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  // Jest doesn't handle non JavaScript assets by default. We use this module
  // (jest-transform-stub) to avoid errors when importing non JavaScript assets.
  // See: https://github.com/eddyerburgh/jest-transform-stub
  transform: {
    '^.+\\.(js|ts|tsx)$': ['babel-jest'],
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],

  // Use moduleNameMapper to let Jest know how to resolve absolute paths.
  // Should be in line with `compilerOptions.paths` in tsconfig.json (or jsconfig.json).
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '^@tests(.*)$': '<rootDir>/__tests__$1',
    '\\.(css|scss)$': '<rootDir>/__tests__/styleMock.js',

    '^@components(.*)$': '<rootDir>/components$1',
  },
};
