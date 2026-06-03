module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      preset: 'ts-jest',
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/shape1*.ts', '**/shape2*.ts', '**/shape4*.ts', '**/shape5*.ts'],
    },
    {
      preset: 'ts-jest',
      displayName: 'jsdom',
      testEnvironment: 'jest-environment-jsdom',
      testMatch: ['**/shape3*.tsx'],
    },
  ],
};
